const { login } = require('../helpers/auth');
const puppeteer = require('puppeteer');

let page, browser;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  page = await browser.newPage();
  await login(page);
});

afterEach(async () => {
  await browser.close();
});

test('Header navigates to blogs index', async () => {
  await page.click('ul.right a');
  const url = await page.evaluate(() => window.location.pathname);

  expect(url).toEqual('/blogs');
});
