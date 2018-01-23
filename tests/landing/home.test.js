jest.setTimeout(25000);
const { Chromeless } = require('chromeless');

let page;

beforeEach(() => {
  page = new Chromeless(
    {
      // cdp: { port: 1235 }
    }
  );
});

afterEach(async () => {
  await page.end();
});

test('Loads the homepage', async () => {
  const h1 = await page
    .goto('localhost:3000')
    .evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
