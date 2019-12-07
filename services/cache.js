const util = require('util');
const keys = require('../config/keys');
const redis = require('redis');
const mongoose = require('mongoose');
const helpers = require('mongoose/lib/queryhelpers');

const exec = mongoose.Query.prototype.exec;
const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);
client.hset = util.promisify(client.hset);

const EXPIRE_TIME = 60;

mongoose.Query.prototype.cache = function(options = {}) {
  this._cache = true;
  this._hashKey = JSON.stringify(options.key || '');

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this._cache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  const cacheValue = await client.hget(this._hashKey, key);

  if (cacheValue) {
    return new Promise((resolve, reject) => {
      const doc = JSON.parse(cacheValue);

      Array.isArray(doc)
        ? resolve(doc.map(d => new this.model(d)))
        : resolve(new this.model(doc));
    });
  } else {
    return exec.apply(this, arguments).then(result => {
      const value = Array.isArray(result)
        ? result.map(r => r.toJSON({ getters: false }))
        : result.toJSON({ getters: false });

      client.hset(this._hashKey, key, JSON.stringify(value), 'EX', EXPIRE_TIME);

      return result;
    });
  }
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
