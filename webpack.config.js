module.exports = {
  target: 'node',
  entry: './index.js',
  output: {
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' }
      }
    ]
  }
};
