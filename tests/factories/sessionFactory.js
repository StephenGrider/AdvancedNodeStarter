const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');

module.exports = user => {
  const session = Buffer.from(
    JSON.stringify({
      passport: {
        user: user._id.toString()
      }
    })
  ).toString('base64');

  const sig = new Keygrip([keys.cookieKey]).sign(`session=${session}`);

  return { session, sig };
};
