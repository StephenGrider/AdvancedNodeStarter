const puppeteer = require('puppeteer'); 
const sessionFactory = require('./../factories/sessionFactory');
const userFactory = require('./../factories/userFactory');

//this helper function is used to create a page to access the test suite
class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    //creating aproxy to access all the page/objects at pnce
    return new Proxy(customPage, {
      get: function (target, property) {
        return target[property] || browser[property] || page[property]
      }
    });

  }

  constructor(page) {
    this.page = page
  }

  async login() {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user)

    // console.log(session, sig)
    await this.page.setCookie({ name: 'session', value: session });
    await this.page.setCookie({ name: 'session.sig', value: sig });
    await this.page.goto('http://localhost:3000/blogs');
    await this.page.waitFor('a[href="/auth/logout"]')
  };

  async getContentsOf(selector) {
    return await this.page.$eval(selector, el => el.innerHTML); 
  }

  get(path) {
    return this.page.evaluate(_path => {
        return fetch(_path, {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json());
      }, path);
  }
}

module.exports = CustomPage