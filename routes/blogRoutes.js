const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const clearNest = require('../middlewares/clearCache')

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {//redis is used to cach querys sent via this api to the server
    //it helps to reduce the number of times we query the database

    // const redis = require('redis');
    // const redisUrl = 'redis://127.0.0.1:6379';
    // const client = redis.createClient(redisUrl);
    // const util = require('util');

    // //promisify converts callback functions to promise function
    // client.get = util.promisify(client.get);

    // //Do we have any cached data in redis related to this query
    // const cachedBlogs = await client.get(req.user.id)

    //if Yes, then respond to the request immediately
    // if (cachedBlogs) {
    //   console.log('Cached Files, Served from cached')
    //   return res.send(JSON.parse(cachedBlogs))
    // }

    //If no, query the database, get the response and save a copy of the response in redis database

    const blogs = await Blog
      .find({ _user: req.user.id })
      .cache({ key: req.user.id });
    // console.log('Serving from mongodb')
    res.send(blogs);

    //save a copy to redis
    //remember to set the items as a key-value pair
    // client.set(req.user.id, JSON.stringify(blogs))
  });

  app.post('/api/blogs', requireLogin, clearNest, async (req, res) => {
    
    const { title, content } = req.body;

    const blog = new Blog({ 
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
