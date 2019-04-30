const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js',
  ],
  // output: {
  //   path: path.resolve('dist'),
  //   filename: 'bundle.js'
  // },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'eslint-loader'],
    },
    {
      test: /\.sass$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
        'sass-loader']
    },
    // {
    //   test: /\.sass$/,
    //   use: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: [
    //       {
    //         loader: 'css-loader',
    //         options: {
    //           modules: true,
    //           importLoaders: 2,
    //           localIdentName: '[name]__[local]__[hash:base64:5]',
    //         },
    //       },
    //       'sass-loader']
    //   }),
    // },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader',
      ],
    },
    {
      test: /\.json$/,
      use: ['json-loader'],
    },
    {
      test: /\.(png|jpg|gif|eot|ttf|woff|woff2|otf)$/,
      use: 'file-loader',
    },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
