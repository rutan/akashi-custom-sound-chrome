const path = require('path');
const webpack = require('webpack');

const paths = (() => {
  const root = __dirname;
  return {
    root,
    src: path.join(root, 'src'),
    out: path.join(root, 'app', 'js'),
    nodeModules: path.join(root, 'node_modules'),
  };
})();

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  bail: isProduction,
  mode: isProduction ? 'production' : 'development',
  entry: {
    contentScript: path.join(paths.src, 'contentScript.tsx'),
  },
  output: {
    path: paths.out,
    filename: '[name].js',
  },
  devtool: isProduction ? false : 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        include: paths.src,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  plugins: [new webpack.DefinePlugin({})],
};
