const mongoose = require('mongoose');
const redis = require('redis')
const util = require('util')

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl)
client.hget = util.promisify(client.hget)
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');
    return this;
}

//using keyword function here because arrow function tries to mess around with the value of this
//inside the function. This is a function assigned to prototype.While *this* should reference the Query being produced
mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        return exec.apply(this, arguments)
    }
    // console.log('I am about to run a query');
    // console.log(this.getQuery());
    // console.log(this.mongooseCollection.name);

    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }))
    // console.log(key)

    //See if we have a value for 'key' in redis
    const cacheValue = await client.hget(this.hashKey, key);

    //If we do, return that
    if (cacheValue) {
        // console.log(this)
        const doc = JSON.parse(cacheValue)

        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc)
    }
    //Otherwise, issue the query and store the result in redis

    const result = await exec.apply(this, arguments)
    
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10) // added cache expiration

    return result;
}