const mongoose = require('mongoose');
require('../../models/User');
const Buffer = require('safe-buffer').Buffer;
const Cookie = require('cookies').Cookie;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');
const User = mongoose.model('users');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

module.exports = {
  async login(page) {
    await page.goto(require('../url'));
    const user = await new User({ googleId: '1' }).save();

    let session = JSON.stringify({
      passport: {
        user: user._id
      }
    });
    session = Buffer.from(session).toString('base64');

    const keygrip = new Keygrip([keys.cookieKey]);

    page.setCookies('session', session);
    page.setCookies('session.sig', keygrip.sign(`session=${session}`));

    await page.goto(require('../url')).wait('a[href="/api/logout"]');
  },

  logout(page) {}
};
