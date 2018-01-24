const { Chromeless } = require('chromeless');
const url = require('../url');

module.exports = () => {
  const page = new Chromeless({
    remote: false, //process.env.NODE_ENV === 'production',
    implicitWait: true
  });

  return page.goto(url).clearCookies();
};
