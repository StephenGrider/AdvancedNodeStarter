const Nightmare = require('nightmare');

let nightmare;

beforeEach(() => {
  nightmare = Nightmare({ show: true });
});

test('Loads the homepage', async () => {
  const val = await nightmare
    .goto('http://localhost:3000')
    .wait('h1')
    .evaluate(() => document.querySelector('h1').innerHTML)
    .end();

  expect(val).toEqual('Emaily!');
});
