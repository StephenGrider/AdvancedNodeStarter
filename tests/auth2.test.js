jest.setTimeout(25000);
const Nightmare = require('nightmare');
const login = require('./helpers/login');

let nightmare;

beforeEach(() => {
  nightmare = Nightmare({ show: true });
  nightmare.cookies.clear('localhost:3000');
});

test('User can login', async () => {
  const val = await nightmare
    .use(login)
    .evaluate(() => document.querySelector('a[href="/api/logout"]').innerHTML)
    .end();

  expect(val).toEqual('Logout');
});

test('Cookie starts as empty but gets defined', async () => {
  nightmare.goto('http://localhost:3000/auth/google');

  expect(await nightmare.cookies.get('session')).toBeNull();

  nightmare.use(login).end();

  expect(await nightmare.cookies.get('session')).toBeTruthy();
});
