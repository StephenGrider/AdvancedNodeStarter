const Chromeless = require('chromeless').default;

async function run() {
  const chromeless = new Chromeless({
    remote: true
  });

  const screenshot = await chromeless.goto('https://google.com').screenshot();

  console.log(screenshot); // prints local file path or S3 url

  await chromeless.end();
}

run().catch(console.error.bind(console));
