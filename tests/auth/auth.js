const { login } = require('../helpers/auth');
const Page = require('../helpers/page');

let page;

beforeEach(async () => {
  page = Page();
  await login(page);
});

test('Logs in', async () => {
  const anchor = await page.evaluate(
    () => document.querySelector('a[href="/api/logout"]').innerHTML
  );

  expect(anchor).toEqual('Logout');
});
