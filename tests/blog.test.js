const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000')
  });

afterEach(async () => {
  await page.close()
})



describe('When Logged In', async () => {
  beforeEach(async () => {
    //we have to loginto the app, to crate a ablog
    await page.login();

    //select the click button
    await page.click('a.btn-floating');
  });

  test('Can see BLog Create Form', async () => {
    const text = await page.getContentsOf('form label')
    expect(text).toEqual('Blog Title')
  });

  //describe using a vaid input
  describe('And use Valid inputs', async () => {
    beforeEach(async () => {

      //on typing set of infoemation before clickiing the button
      await page.type('.title input', 'My Title')
      await page.type('.content input', 'My Content')
      await page.click('form button');
    });

    test('Submitting takes user to review the screen', async () => {
      const reviewText = await page.getContentsOf('h5');
      expect(reviewText).toEqual('Please confirm your entries');
    });

    test('Submitting then saving adds blog to the home page', async () => {
      //clicking the save button
      await page.click('button.green')
      await page.waitFor('.card');

      //get content of the blog
      const title = await page.getContentsOf('.card-title');
      const content = await page.getContentsOf('p');

      //assertions
      expect(title).toEqual('My Title');
      expect(content).toEqual('My Content');
    });
  });

  //nested describe to carrymore functions
  describe('And use invalid inputs', async () => {
    beforeEach(async () => {
      
      //on clicking the submit button
      await page.click('form button');
    });

    test('The Form shows an incorrect message', async () => {
      const titleError = await page.getContentsOf('.title .red-text')
      const contentError = await page.getContentsOf('.content .red-text');

      //assertions
      expect(titleError).toEqual('You must provide a value');
      expect(contentError).toEqual('You must provide a value');
    });
  });
});

describe('User is not logged in', async () => {
  test('User cannot create blog posts', async () => {
    const result = await page.evaluate(
      () => {
        return fetch('api/blogs', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: 'My Title', content: 'My Content' })
        }).then(res => res.json());
      }
    )
    expect(result).toEqual({ error: 'You must log in!' });
  });

  test('User cannot get a list of posts', async () => {

    const result = await page.evaluate(
      () => {
        return fetch('api/blogs', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json());
      });
    
    expect(result).toEqual({ error: 'You must log in!' });
  })
});