const mongoose = require('mongoose');

module.exports = (opts = {}) => {
  const User = mongoose.model('users');

  return new User(
    Object.assign(
      {},
      {
        googleId: '1'
      },
      opts
    )
  ).save();
};
