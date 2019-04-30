module.exports = {
  entry: [
    './src/index.js',
  ],
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
  }
};
