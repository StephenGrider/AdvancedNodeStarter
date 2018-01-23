jest.setTimeout(25000);
const { Chromeless } = require('chromeless');

let page;

beforeEach(() => {
  page = new Chromeless();
});

afterEach(async () => {
  await page.end();
});

test('Loads the homepage', async () => {
  const p = await page.goto('localhost:3000').html();

  console.log(p);
  const h1 = await page.evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
