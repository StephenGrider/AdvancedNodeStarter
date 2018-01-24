const { login } = require('../helpers/auth');
const Page = require('../helpers/page');

let page;

beforeEach(async () => {
  page = Page();
  await login(page);
});

test('Header navigates to blogs index', async () => {
  const url = await page
    .click('ul.right a')
    .evaluate(() => window.location.pathname);

  expect(url).toEqual('/blogs');
});
