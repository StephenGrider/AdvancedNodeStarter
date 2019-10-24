const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');

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
  const user = await userFactory();
  const {session, sig } = sessionFactory(user)
  
  console.log(session, sig)
  await page.setCookie({ name: 'session', value: session });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.goto('localhost:3000');
  await page.waitFor('a[href="/auth/logout"]')

  const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
  expect(text).toEqual('Logout');
})
