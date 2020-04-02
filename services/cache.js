const mongoose = require('mongoose');
const redis = require('redis')
const util = require('util')

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl)
client.get = util.promisify(client.get)
const exec = mongoose.Query.prototype.exec

//using keyword function here because arrow function tries to mess around with the value of this
//inside the function. This is a function assigned to prototype.While *this* should reference the Query being produced
mongoose.Query.prototype.exec = async function () {
    console.log('I am about to run a query');
    // console.log(this.getQuery());
    // console.log(this.mongooseCollection.name);
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name
    }))
    // console.log(key)

    //See if we have a value for 'key' in redis
    const cacheValue = await client.get(key);

    //If we do, return that
    if (cacheValue) {
        console.log(cacheValue)

        return JSON.parse(cacheValue);
    }
    //Otherwise, issue the query and store the result in redis

    const result = await exec.apply(this, arguments)
    
    client.set(key, JSON.stringify(result))

    return result;
}