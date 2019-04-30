const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            'sass-loader']
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
});
