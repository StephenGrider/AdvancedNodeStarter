const mongoose = require("mongoose");
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget)
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (option = {}) {
    this.isCache = true;
    this.hasKey = JSON.stringify(option || '')
    return this;
}

mongoose.Query.prototype.exec = async function () {
    if (!this.isCache) {
        return exec.apply(this, arguments);
    }
    console.log("query", this.getQuery())
    const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }))
    
    const cachable = await client.hget(this.hasKey, key);
    if (cachable) {
        const doc = JSON.parse(cachable)
        // console.log("cachable:", doc)
        //client.flushall
        return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc)
    }
    const result = await exec.apply(this, arguments);
    client.hset(this.hasKey, key, JSON.stringify(result));

    return result;


}
module.exports = {
    clearHash(hasKey) {
        console.log("has:", hasKey)
        client.del(JSON.stringify({ key: hasKey }))
    }
}