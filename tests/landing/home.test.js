const puppeteer = require('puppeteer');

let page, browser;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close();
});

test('Loads the homepage', async () => {
  await page.goto(require('../url'));
  const h1 = await page.evaluate(() => document.querySelector('h1').innerHTML);
  expect(h1).toEqual('Emaily!');
});

test('Loads the homepage', async () => {
  await page.goto(require('../url'));
  const h1 = await page.evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
test('Loads the homepage', async () => {
  await page.goto(require('../url'));
  const h1 = await page.evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
test('Loads the homepage', async () => {
  await page.goto(require('../url'));
  const h1 = await page.evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
test('Loads the homepage', async () => {
  await page.goto(require('../url'));
  const h1 = await page.evaluate(() => document.querySelector('h1').innerHTML);

  expect(h1).toEqual('Emaily!');
});
