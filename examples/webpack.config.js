const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './index.tsx'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@data-manager/api-browser': path.resolve(process.cwd(), 'packages/api-browser/src'),
      '@data-manager/folders': path.resolve(process.cwd(), 'packages/folders/src'),
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    historyApiFallback: true,
  }
}
