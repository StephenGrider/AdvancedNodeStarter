const mongoose = require('mongoose');

module.exports = (opts = {}) => {
  const User = mongoose.model('users');

  return new User({
    googleId: '1',
    ...opts
  }).save();
};
