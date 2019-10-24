//this is a helper function used to reun test functions
const Buffer = require('safe-buffer').Buffer;
const KeyGrip = require('keygrip')
const keys = require('../../config/keys');
const keygrip = new KeyGrip([keys.cookieKey]);

module.exports = user => {
  //creating a a session string
  const sessionObject = {
    passport: {
      user: user._id.toString()
    }
  };

  //converting the id into a token in base64
  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
  const sig = keygrip.sign('session=' + session);

  return{ session: session, sig: sig }
}




