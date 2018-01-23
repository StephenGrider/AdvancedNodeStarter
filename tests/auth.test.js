jest.setTimeout(25000);
const { Chromeless } = require('chromeless');

let page;

beforeEach(() => {
  page = new Chromeless({
    cdp: { port: 1234 },
    implicitWait: true
  });
});

afterEach(async () => {
  await page.end();
});

const GOOGLE_EMAIL = 'devemaily@gmail.com';
const GOOGLE_PASSWORD = 'mydevaccount';

test('Logs in', async () => {
  // await page
  //   .goto('http://localhost:3000/auth/google')
  //   .wait('#identifierId')
  //   .type(GOOGLE_EMAIL, '#identifierId')
  //   .click('#identifierNext content')
  //   .wait(2500)
  //   .type(GOOGLE_PASSWORD, 'input[type="password"]')
  //   .click('#passwordNext content')
  //   .wait('a[href="/api/logout"]');

  await page
    .goto('http://localhost:3000/auth/google')
    .wait('#Email')
    .type(GOOGLE_EMAIL, '#Email')
    .click('.rc-button-submit')
    .wait(1000)
    .type(GOOGLE_PASSWORD, '#Passwd')
    .click('#signIn')
    .wait(3500);

  try {
    await page.click('#submit_approve_access');
  } catch (err) {}

  await page.wait('a[href="/api/logout"]');

  const anchor = await page.evaluate(
    () => document.querySelector('a[href="/api/logout"]').innerHTML
  );

  expect(anchor).toEqual('Logout');
});
