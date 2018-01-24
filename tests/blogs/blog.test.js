jest.setTimeout(25000);
const { login } = require('../helpers/auth');
const Page = require('../helpers/page');

let page;

beforeEach(() => {
  page = Page();
});

afterEach(async () => {
  await page.end();
});

test('Header navigates to blogs index', async () => {
  await login(page);

  const url = await page
    .click('ul.right a')
    .evaluate(() => window.location.pathname);

  expect(url).toEqual('/blogs');
});
