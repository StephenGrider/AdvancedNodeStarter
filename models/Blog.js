const keys = require('../config/keys');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const fileSchema = require('./File');

const blogSchema = new Schema({
  title: String,
  content: String,
  files: [fileSchema],
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

blogSchema.set('toJSON', { getters: true });

function filePath(file) {
  if (file) {
    return `${keys.s3BucketUrl}${file}`;
  }
}

mongoose.model('blogs', blogSchema);
