const { Chromeless } = require('chromeless');
const url = require('../url');

module.exports = () => {
  const page = new Chromeless({
    // remote: false, //process.env.NODE_ENV === 'production',
    remote: process.env.TEST_MODE === 'fast',
    implicitWait: true
  });

  return page.goto(url).clearCookies();
};
