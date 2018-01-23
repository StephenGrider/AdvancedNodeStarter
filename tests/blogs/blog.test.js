jest.setTimeout(25000);
const { Chromeless } = require('chromeless');
const login = require('../helpers/login');

let page;

beforeEach(() => {
  page = new Chromeless({
    cdp: { port: 1236 },
    implicitWait: true
  });
});

afterEach(async () => {
  await page.end();
});

test('Navigates to blogs index', async () => {
  await login(page);

  const url = await page
    .click('ul.right a')
    .evaluate(() => window.location.pathname);

  expect(url).toEqual('/blogs');
});
