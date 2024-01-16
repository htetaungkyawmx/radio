const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'assets/js/[name].bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|ico)(\?.+)?$/,
        include: [path.resolve(__dirname, '../src/img')],
        use: {
          loader: 'file-loader',
          options: {
            name: '[path]/[name].[ext]',
            outputPath: url => url.replace(/src\//, 'assets/')
          }
        }
      },
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].bundle.css'
    })
  ],
  devServer: {
    static: path.join(
      __dirname,
      '../dist/html'
    ),
    port: 8090,
    open: true
  }
});
