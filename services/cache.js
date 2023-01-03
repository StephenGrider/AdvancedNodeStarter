const { json } = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const exec = mongoose.Query.prototype.exec;
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

mongoose.Query.prototype.exec = async function () {
	if (!this.useCache) {
		return exec.apply(this, arguments);
	}
	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name,
		})
	);

	const cacheValue = await client.hget(this.hashKey, key);

	if (cacheValue) {
		console.log('result from cache');
		const doc = JSON.parse(cacheValue);
		return Array.isArray(doc)
			? doc.map((d) => new this.model(d))
			: new this.model(doc);
	}

	const result = await exec.apply(this, arguments);
	console.log('result from mongoose');

	client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

	return result;
};
mongoose.Query.prototype.cache = function (options = {}) {
	this.useCache = true;
	this.hashKey = JSON.stringify(options.key || '');
	return this;
};

module.exports = {
	clearHash(hashKey) {
		client.del(JSON.stringify(hashKey));
	},
};
