const GOOGLE_EMAIL = 'devemaily@gmail.com';
const GOOGLE_PASSWORD = 'mydevaccount';

module.exports = async page => {
  const html = await page
    .goto('http://localhost:3000/auth/google')
    .wait('#Email')
    .type(GOOGLE_EMAIL, '#Email')
    .click('.rc-button-submit')
    .wait(1000)
    .type(GOOGLE_PASSWORD, '#Passwd')
    .click('#signIn');
  console.log(html);
  await page.wait('#submit_approve_access').evaluate(() => {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        const { disabled } = document.querySelector('#submit_approve_access');

        if (!disabled) {
          resolve();
        }
      }, 100);
    });
  });

  await page.click('#submit_approve_access');

  await page.wait('a[href="/api/logout"]');

  return page;
};
