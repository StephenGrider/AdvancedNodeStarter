module.exports = {
  target: 'node',
  entry: './index.js',
  output: {
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        use: { loader: 'babel-loader' }
      }
    ]
  }
};
