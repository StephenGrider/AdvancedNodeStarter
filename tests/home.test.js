const puppeteer = require('puppeteer');
const Page = require('./helpers/page');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = Page(await browser.newPage());
});

afterEach(async () => {
  await browser.close();
});

test('Loads the homepage', async () => {
  await page.goto('localhost:3000');
  await page.waitFor('h1');

  const h1 = await page.evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
