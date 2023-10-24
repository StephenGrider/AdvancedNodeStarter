const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {

    const redis = require('redis')
    const redisUrl = 'redis://127.0.0.1:6379'
    const redisClient  = redis.createClient(redisUrl)
    const util = require('util')
    redisClient.get = util.promisify(redisClient.get)

    const cachedBlogs  = await redisClient.get(req.user.id)

    if(cachedBlogs){
      console.log('BLOGS SERVE FROM REDIS')
      return res.send(JSON.parse(cachedBlogs))
    }

    const blogs  = await Blog.find({_user:req.user.id})
    res.send(blogs)
    redisClient.set(req.user.id, JSON.stringify(blogs))
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = await Blog.find({ _user: req.user.id });

    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
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
