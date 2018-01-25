const puppeteer = require('puppeteer');
const userFactory = require('../factories/userFactory');
const sessionFactory = require('../factories/sessionFactory');

class Page {
  static async build(opts) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
      ...opts
    });

    const page = new Page({
      browser,
      page: await browser.newPage()
    });

    return new Proxy(page, {
      get(target, property) {
        return (
          page[property] || page._page[property] || page._browser[property]
        );
      }
    });
  }

  constructor({ page, browser }) {
    this._page = page;
    this._browser = browser;
  }

  async login(userOpts = {}) {
    this.currentUser = await userFactory(userOpts);
    const { session, sig } = sessionFactory(this.currentUser);

    await this.goHome();
    await this._page.setCookie({ name: 'session', value: session });
    await this._page.setCookie({ name: 'session.sig', value: sig });
    await this._page.goto(require('../url'));
    await this._page.waitFor('a[href="/api/logout"]');
  }

  async goHome() {
    await this._page.goto(require('../url'));
  }

  getContentsOf(selector) {
    return this._page.evaluate(
      s => document.querySelector(s).innerHTML,
      selector
    );
  }

  close() {
    return this._browser.close();
  }

  get(path) {
    return this._page.evaluate(p => {
      return fetch(p, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    }, path);
  }

  post(path, data) {
    return this._page.evaluate(
      (p, d) => {
        return fetch(p, {
          method: 'POST',
          body: JSON.stringify(d),
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json());
      },
      path,
      data
    );
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return this[method](path, data);
      })
    );
  }
}

module.exports = Page;
