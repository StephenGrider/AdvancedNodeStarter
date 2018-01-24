jest.setTimeout(25000);
const { login } = require('../helpers/auth');
const Page = require('../helpers/page');

let page;

beforeEach(() => {
  page = Page();
});

afterEach(async () => {
  await page.end();
});

test('Logs in', async () => {
  await login(page);

  const anchor = await page.evaluate(
    () => document.querySelector('a[href="/api/logout"]').innerHTML
  );

  expect(anchor).toEqual('Logout');
});
