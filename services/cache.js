const mongoose=require("mongoose");
const redis=require("redis");
const redisUrl="redis://127.0.0.1:6379";
const client=redis.createClient(redisUrl);
const util=require("util");
client.hget=util.promisify(client.hget);
const exec=mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache=function(options={}){
  this.useCache=true;
  //adding the top level key
  this.hashKey=JSON.stringify(options.key || "default");
  return this;
}

mongoose.Query.prototype.exec=async function(){
  // if we are not using the cache for the query
  if(!this.useCache){
    return exec.apply(this,arguments);
  }
  const KEY=JSON.stringify(Object.assign({},
    this.getQuery(),
    {collection:this.mongooseCollection.name}
  ));
  // check if we have key in redis
  const cachedValue=await client.hget(this.hashKey,KEY)

  // if yes return the result
  if(cachedValue){
    const doc=JSON.parse(cachedValue);
    console.log("serving from cache");
    return Array.isArray(doc)
    ? doc.map(item=>new this.model(item))
    : new this.model(doc);
  }

  // else set and go to mongodb
  const res=await exec.apply(this,arguments);
  console.log("data from db and setting on redis")
  client.hmset(this.hashKey, KEY, JSON.stringify(res), "EX", 10);

  return res;
}

module.exports={
  clearHash(hashKey){
    client.del(JSON.stringify(hashKey));
  }
}
