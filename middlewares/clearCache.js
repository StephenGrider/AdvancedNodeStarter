const { clearNest } = require('../services/cache')

module.exports = async (req, res, next) => {
  //this will enable the handler to run before this function runs
  await next();

  //when save a new blog we clear the cache and start again
  clearNest(req.user.id)
}