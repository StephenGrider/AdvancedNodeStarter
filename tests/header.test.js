const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
const Page = require('./helpers/page');

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto('localhost:3000');
});

afterEach(async () => {
	await page.close();
});

test('The header has the correct text', async () => {
	const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);

	expect(text).toEqual('Blogster');
});

test('click login start OAuth flow', async () => {
	await page.click('.right a');

	const url = await page.url();

	expect(url).toMatch(/accounts\.google.com/);
});

test('When signed in, shows logout button', async () => {
	await page.login();
	await page.goto('localhost:3000');
	await page.waitFor('a[href="/auth/logout"]');
	const logoutLink = await page.$eval(
		'a[href="/auth/logout"]',
		(el) => el.innerHTML
	);

	expect(logoutLink).toMatch(/Logout/);
});
