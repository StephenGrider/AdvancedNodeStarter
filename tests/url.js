module.exports =
  process.env.NODE_ENV === 'production'
    ? 'https://chromelesstesteraws.localtunnel.me'
    : 'http://localhost:3000';
