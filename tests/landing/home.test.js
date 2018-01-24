const Page = require('../helpers/page');

let page;

beforeEach(async () => {
  page = Page();
});

test('Loads the homepage', async () => {
  const h1 = await page
    .goto(require('../url'))
    .evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
