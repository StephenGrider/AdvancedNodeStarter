const Page = require('./helpers/page');

let page;

beforeEach(async () => {
	page = await Page.build();
	await page.goto('localhost:3000');
});

afterEach(async () => {
	page.close();
});

describe('When logged in', () => {
	beforeEach(async () => {
		await page.login();
		await page.click('a.btn-floating');
	});

	test('can see blog create form', async () => {
		let label = await page.getContentsOf('form label');
		expect(label).toMatch('Blog Title');
	});

	describe('And using invalid inputs', () => {
		beforeEach(async () => {
			await page.click('form button');
		});

		test('the form shows an error message', async () => {
			const titleError = await page.getContentsOf('.title .red-text');
			const contentError = await page.getContentsOf('.content .red-text');

			expect(titleError).toEqual('You must provide a value');
			expect(contentError).toEqual('You must provide a value');
		});
	});

	describe('and using valid inputs', () => {
		beforeEach(async () => {
			await page.type('.title input', 'My title');
			await page.type('.content input', 'My content');
			await page.click('form button');
		});
		test('submitting takes user to review screen', async () => {
			const text = await page.getContentsOf('h5');

			expect(text).toMatch('Please confirm your entries');
		});
		test('submitting then saving adds blog to index page', async () => {
			await page.click('button.green');

			await page.waitFor('.card');

			const title = await page.getContentsOf('.card-title');
			const content = await page.getContentsOf('p');

			expect(title).toMatch('My title');
			expect(content).toMatch('My content');
		});
	});
});

describe('User is not logged in', () => {
	const actions = [
		{
			method: 'get',
			path: '/api/blogs',
		},
		{
			method: 'post',
			path: '/api/blogs',
			data: {
				title: 'T',
				content: 'C',
			},
		},
	];
	test('Blog related action are prohibited', async () => {
		const results = await page.execRequests(actions);

		for (let result of results) {
			expect(result).toEqual({ error: 'You must log in!' });
		}
	});
});
