const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  content: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('blogs', blogSchema);
