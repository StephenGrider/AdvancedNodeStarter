const Page = require('../helpers/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goHome();
});

afterEach(async () => {
  await page.close();
});

test('Loads the header', async () => {
  const logo = await page.getContentsOf('a.left.brand-logo');

  expect(logo).toEqual('Emaily');
});

describe('When not logged in', () => {
  test('shows a Login with Google button', async () => {
    const button = await page.getContentsOf('ul li a');

    expect(button).toEqual('Login With Google');
  });
});

describe('When logged in', () => {
  beforeEach(async () => {
    await page.login();
  });

  test('shows a Logout button', async () => {
    const logout = await page.getContentsOf('ul li:nth-child(2) a');

    expect(logout).toEqual('Logout');
  });

  test('shows a link to Blogs', async () => {
    const blogs = await page.getContentsOf('ul li:nth-child(1) a');

    expect(blogs).toEqual('Blogs');
  });
});
