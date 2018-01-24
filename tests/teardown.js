const CDP = require('chrome-remote-interface');

module.exports = async () => {
  const targets = await CDP.List();
  await Promise.all(targets.map(({ id }) => CDP.Close({ id })));
};
