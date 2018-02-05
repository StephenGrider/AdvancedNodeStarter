const mongoose = require('mongoose');

module.exports = (opts = {}) => {
  const User = mongoose.model('User');

  return new User(
    Object.assign(
      {},
      {
        googleId: (~~(Math.random() * 10000000)).toString()
      },
      opts
    )
  ).save();
};
