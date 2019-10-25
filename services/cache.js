const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const chalk = require('chalk');
const keys = require('../config/keys')

//get redis url
const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);

//getting the default query setup of mongoose
const exec = mongoose.Query.prototype.exec

//making the caching system toggable by creating a function from the mongoose cofig
mongoose.Query.prototype.cache = function(options = {}) {
  this.engageCache = true;

  //setting the values as a nested object
  this.nestKey = JSON.stringify(options.key || '');

  return this;
}

//create a query condition for all query
mongoose.Query.prototype.exec = async function () {
  if (!this.engageCache) {
    //run the query without caching
    return exec.apply(this, arguments);
  }

  //combining both keys of collections and the query
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  }));

  const cacheValue = await client.hget(this.nestKey, key);

  //if there is a calue
  if (cacheValue) {
    console.log(chalk.yellow.inverse('Caching in Progress'));

    //changing the data in a model document, model works with an obkect
    const doc = JSON.parse(cacheValue);

    //check if its an object or an array

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  //otherwise, issue the query and store a copy in redis
  const result = await exec.apply(this, arguments)

  client.hmset(this.nestKey, key, JSON.stringify(result), 'EX', '10');

  return result;
};

//creating a function that automatically clears the cache b user id
module.exports = {
  clearNest(nestKey) {
    client.del(JSON.stringify(nestKey));
  }
}