const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

console.log(process.argv)
const isDev = process.argv.includes('development')

console.log(isDev)
module.exports = {
    entry: {
      'wave': path.resolve(__dirname, '../src/wave/index.js')
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: isDev ? '[name].js' : '[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.resolve(__dirname, '../src/')],
          use: [{
            loader: 'babel-loader',
          }]
        },
        {
          test: /\.(scss|css)/,
          use: [
            'css-loader',
            'sass-loader',
          ],
        },
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        filename: 'wave.html'
      }),
    ]
}
