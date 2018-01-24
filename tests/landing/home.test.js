jest.setTimeout(15000);
const { Chromeless } = require('chromeless');

let page;

beforeEach(() => {
  page = new Chromeless({ remote: true });
});

afterEach(async () => {
  await page.end();
});

test('Loads the homepage', async () => {
  const h1 = await page
    .goto(require('../url'))
    .evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
