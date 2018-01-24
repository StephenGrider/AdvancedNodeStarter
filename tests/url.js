// module.exports = 'http://localhost:3000';
// // process.env.NODE_ENV === 'production'
// //   ? 'https://chromelesstesteraws.localtunnel.me'
// //   : 'http://localhost:3000';

module.exports =
  process.env.TEST_MODE === 'fast'
    ? 'https://chromelesstesteraws.localtunnel.me'
    : 'http://localhost:3000';
