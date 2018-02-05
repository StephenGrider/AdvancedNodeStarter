require('../models/Blog');
const keys = require('../config/keys');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

/**
 * Make any changes you need to make to the database here
 */
export async function up() {
  const cursor = mongoose
    .model('blogs')
    .find({})
    .cursor();

  let blog = await cursor.next();

  while (blog) {
    if ((!blog.files || !blog.files.length) && blog.file) {
      blog.files.push({ url: blog.toObject().file });
      await blog.save();
    }

    blog = await cursor.next();
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down() {
  const cursor = mongoose
    .model('blogs')
    .find({})
    .cursor();

  let blog = await cursor.next();

  while (blog) {
    if (!blog.file && blog.files.length) {
      blog.file = blog.toObject().files[0].url;

      await blog.save();
    }

    blog = await cursor.next();
  }
}
