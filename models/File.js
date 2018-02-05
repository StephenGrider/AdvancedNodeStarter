const keys = require('../config/keys');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
  url: { type: String, get: getUrl }
});

fileSchema.set('toJSON', { getters: true });

function getUrl(file) {
  if (file) {
    return `${keys.s3BucketUrl}${file}`;
  }
}

module.exports = fileSchema;
