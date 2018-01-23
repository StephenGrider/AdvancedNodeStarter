jest.setTimeout(15000);
const { Chromeless } = require('chromeless');

let page;

beforeEach(() => {
  page = new Chromeless();
});

afterEach(async () => {
  await page.end();
});

test('Loads the homepage', async () => {
  console.log('IM HERE!');
  const p = await page.goto('localhost:3000').html();

  console.log(p);
  const h1 = await page.evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
