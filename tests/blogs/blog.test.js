jest.setTimeout(25000);
const { Chromeless } = require('chromeless');
const { login } = require('../helpers/auth');

let page;

beforeEach(() => {
  page = new Chromeless({
    remote: true,
    implicitWait: true
  });
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
