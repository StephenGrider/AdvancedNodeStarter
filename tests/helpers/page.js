const { Chromeless } = require('chromeless');

module.exports = () => {
  return new Chromeless({
    remote: false, //process.env.NODE_ENV === 'production',
    implicitWait: true
  });
};
