const keys = require('../config/keys');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  content: String,
  file: { type: String, get: filePath },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

blogSchema.set('toJSON', { getters: true });

function filePath(file) {
  return `${keys.s3BucketUrl}${file}`;
}

mongoose.model('blogs', blogSchema);
