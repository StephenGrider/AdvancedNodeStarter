const Page = require('./helpers/page')

let page;
//before each test, lauch chronium
beforeEach(async () => {

  //setTimeout
  jest.setTimeout('300000')

  page = await Page.build()
  await page.goto('localhost:3000')
});

//after test shoutdown chri=oniu,
afterEach(async () => {
  await page.close();
});

//run test
test('We can lauch Chronium', async () => {
  await page.getContentsOf('a.brand-logo');

  expect(text).toEqual('Blogster')
})

test('CLick to route to google Oauth flow', async () => {
  await page.click('.right a')
  const url = await page.url();
  expect(url).toMatch(/accounts\.google\.com/)
});

test('When Signed in, shows logout button', async () => {
  await page.login();

  await page.getContentsOf('a[href="/auth/logout"]')
  expect(text).toEqual('Logout');
})
