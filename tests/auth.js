jest.setTimeout(25000);
const puppeteer = require('puppeteer');
const Page = require('./helpers/page');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = Page(await browser.newPage());
});

afterAll(async () => {
  await browser.close();
});

const GOOGLE_EMAIL = 'devemaily@gmail.com';
const GOOGLE_PASSWORD = 'mydevaccount';

test('Loads the homepage', async () => {
  await page.goto('http://localhost:3000/auth/google');
  await page.waitFor('#identifierId');
  await page.type('#identifierId', GOOGLE_EMAIL);
  await page.click('#identifierNext content');
  await page.waitFor(2500);
  await page.type('input[type="password"]', GOOGLE_PASSWORD);
  await page.click('#passwordNext content');
  await page.waitFor('a[href="/api/logout"]');

  const anchor = await page.evaluate(
    () => document.querySelector('a[href="/api/logout"]').innerHTML
  );

  expect(anchor).toEqual('Logout');
});
