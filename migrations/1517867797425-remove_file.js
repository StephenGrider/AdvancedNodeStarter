require('../models/Blog');
const keys = require('../config/keys');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

export async function up() {
  await mongoose.model('blogs').update(
    {},
    {
      $unset: { file: 1 }
    },
    { multi: true, strict: false }
  );
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down() {
  const Blogs = mongoose.model('blogs');
  Blogs.schema.set('strict', false);

  const cursor = Blogs.find({}).cursor();

  let blog = await cursor.next();

  while (blog) {
    if (blog.files.length) {
      blog.set('file', blog.toObject().files[0].url);
      await blog.save({ validateBeforeSave: false });
    }

    blog = await cursor.next();
  }
}
