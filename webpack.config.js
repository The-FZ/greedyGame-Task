const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// import "@babel/polyfill";


module.exports = {

  entry: ["@babel/polyfill", './src/index.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]
};
