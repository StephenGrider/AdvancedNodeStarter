const Page = require('../helpers/page');

let page, browser;

beforeEach(async () => {
  page = await Page.build();
});

afterEach(async () => {
  await page.close();
});

describe('While logged in', async () => {
  beforeEach(async () => {
    await page.login();
    await page.click('a[href="/blogs"]');
    await page.click('a.btn-floating.red');
  });

  test('Blog creation page shows a form', async () => {
    const label = await page.getContentsOf('form label');

    expect(label).toEqual('Blog Title');
  });

  describe('with valid inputs', () => {
    const title = 'Thoughts on blogging';
    const content = 'Content on blogging';

    beforeEach(async () => {
      await page.type('.title input', title);
      await page.type('.content input', content);
    });

    test('submitting takes use to review screen', async () => {
      await page.click('button[type="submit"]');

      expect(await page.getContentsOf('h5')).toEqual(
        'Please confirm your entries'
      );
    });

    test('Submitting then saving adds blog to index', async () => {
      await page.click('button[type="submit"]');
      await page.click('button.green');
      await page.waitFor('.card');

      expect(await page.getContentsOf('.card-title')).toEqual(title);
      expect(await page.getContentsOf('p')).toEqual(content);
    });
  });

  describe('with invalid inputs', () => {
    test('displays error messages', async () => {
      await page.click('button[type="submit"]');

      expect(await page.getContentsOf('div.title .red-text')).toEqual(
        'You must provide a value'
      );

      expect(await page.getContentsOf('div.content .red-text')).toEqual(
        'You must provide a value'
      );
    });
  });
});

describe('While not logged in', () => {
  beforeEach(async () => {
    await page.goHome();
  });

  test('creating a blog returns an error', async () => {
    const res = await page.post('/api/blogs', {
      title: 'Hi Blog',
      content: 'There Blog'
    });

    expect(res).toEqual({ error: 'You must log in!' });
  });

  const actions = [
    {
      method: 'post',
      path: '/api/blogs',
      data: {
        title: 'Hi Blog',
        content: 'There Blog'
      }
    },
    {
      method: 'get',
      path: '/api/blogs'
    }
  ];

  test('Blog related actions prohibited', async () => {
    const results = await page.execRequests(actions);

    for (let result of results) {
      expect(result).toEqual({ error: 'You must log in!' });
    }
  });
});
