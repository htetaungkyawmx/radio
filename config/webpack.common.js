const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { HtmlWebpackSkipAssetsPlugin } = require('html-webpack-skip-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const templates = [];
const dir = './src/html';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.match(/\.html$/)) {
    templates.push(
      new HtmlWebpackPlugin({
        template: dir + '/' + file,
        filename: 'html/' + file,
        excludeAssets: [/critical.*.*/],
        alwaysWriteToDisk: true
      }),
      new HtmlWebpackSkipAssetsPlugin()
    );
    templates.push(new HtmlWebpackHarddiskPlugin());
  }
});

module.exports = {
  entry: {
    main: './src/js/main.js'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                stringifier: 'sugarss',
                plugins: () => [
                  require('autoprefixer')({}),
                  require('cssnano')({ preset: 'default' })
                ]
              },

              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)(\?.+)?$/,
        include: [path.resolve(__dirname, '../src/img')],
        use: {
          loader: 'file-loader',
          options: {
            name: '../assets/img/[name].[ext]',
            outputPath: url => url.replace(/src\//, 'assets/')
          }
        }
      },
      {
        test: /\.(eot|otf|ttf|woff2?|svg)(\?.+)?$/,
        include: [path.resolve(__dirname, '../src', 'fonts')],
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(pug|html)$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: false
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env'
                ]
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    maxEntrypointSize: 5000000,
    maxAssetSize: 5000000
  },
  plugins: [
    
  ].concat(templates),
  resolve: {
    extensions: ['.js']
  }
};
