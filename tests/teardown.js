const CDP = require('chrome-remote-interface');

module.exports = async () => {
  // if (process.env.TEST_MODE !== 'fast') {
  //   const targets = await CDP.List();
  //   await Promise.all(targets.map(({ id }) => CDP.Close({ id })));
  // }
};
