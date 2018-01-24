const { Chromeless } = require('chromeless');

module.exports = () => {
  return new Chromeless({
    remote: process.env.NODE_ENV === 'production',
    implicitWait: true
  });
};
