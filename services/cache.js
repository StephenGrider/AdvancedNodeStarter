const { json } = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const exec = mongoose.Query.prototype.exec;
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

mongoose.Query.prototype.exec = async function () {
	if (!this.useCache) {
		return exec.apply(this, arguments);
	}
	const key = JSON.stringify(
		Object.assign({}, this.getQuery(), {
			collection: this.mongooseCollection.name,
		})
	);

	const cacheValue = await client.get(key);

	if (cacheValue) {
		console.log('result from cache');
		const doc = JSON.parse(cacheValue);
		return Array.isArray(doc)
			? doc.map((d) => new this.model(d))
			: new this.model(doc);
	}

	const result = await exec.apply(this, arguments);
	console.log('result from mongoose');

	client.set(key, JSON.stringify(result), 'EX', 10);

	return result;
};
mongoose.Query.prototype.cache = function () {
	this.useCache = true;
	return this;
};
