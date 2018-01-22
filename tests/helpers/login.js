const GOOGLE_EMAIL = 'devemaily@gmail.com';
const GOOGLE_PASSWORD = 'mydevaccount';

module.exports = nightmare => {
  return nightmare
    .goto('http://localhost:3000/auth/google')
    .wait(2500)
    .insert('#identifierId', GOOGLE_EMAIL)
    .click('#identifierNext content')
    .wait(2500)
    .insert('input[type="password"]', GOOGLE_PASSWORD)
    .click('#passwordNext content')
    .wait('a[href="/api/logout"]');
};
