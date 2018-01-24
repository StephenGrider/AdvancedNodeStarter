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

test('Logs in', async () => {
  const anchor = await page.evaluate(
    () => document.querySelector('a[href="/api/logout"]').innerHTML
  );

  expect(anchor).toEqual('Logout');
});
