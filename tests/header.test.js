const puppeteer = require('puppeteer');

let browser, page;
//before each test, lauch chronium
beforeEach(async () => {

  //setTimeout
  jest.setTimeout('300000')

  browser = await puppeteer.launch({
    headless: false
  });

  page = await browser.newPage();
  await page.goto('localhost:3000')
});

//after test shoutdown chri=oniu,
afterEach(async () => {
  await browser.close();
})

//run test
test('We can lauch Chronium', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster')
})

test('CLick to route to google Oauth flow', async () => {
  await page.click('.right a')
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/)
});

test('When Signed in, shows logout button', async () => {
  const id = '5d95eb242addd453b815afe7';

  const Buffer = require('safe-buffer').Buffer;

  //creating a a session string
  const sessionObject = {
    passport: {
      user: id
    }
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

  const KeyGrip = require('keygrip')
  const keys = require('../config/keys');
  const keygrip = new KeyGrip([keys.cookieKey]);
  const sig = keygrip.sign('session=' + sessionString);
  
  console.log(sessionString, sig)
  await page.setCookie({ name: 'session', value: sessionString });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.goto('localhost:3000');

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
  expect(text).toEqual('logout');
})
