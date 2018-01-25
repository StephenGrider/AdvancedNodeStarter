const Page = require('../helpers/page');

let page, browser;

beforeEach(async () => {
  page = await Page.build();
  await page.login();
});

afterEach(async () => {
  await page.close();
});

test('Logs in', async () => {
  const anchor = await page.getContentsOf('a[href="/api/logout"]');

  expect(anchor).toEqual('Logout');
});
