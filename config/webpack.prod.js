const { merge } = require('webpack-merge');
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: {
  },
  output: {
    path: path.join(__dirname, '../assets'),
    filename: 'js/[name].bundle.js'
  },

  module: {
    rules: [ 
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all'
        },
        vendor: {
          test: /[\\/]node_modules[\\/](jquery)[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin(), new TerserPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css'
    }),
    new CssMinimizerPlugin(),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
            ['pngquant', { optimizationLevel: 75 }],
            ['mozjpeg', { quality: 75 }]
          ]
        }
      }
    })
  ]
});
