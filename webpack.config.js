const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    "index": "./index",
    "components/Button": "./src/components/Button"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    library: "TykUI"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {}
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 400000
  },
  devtool: "source-map",
  context: __dirname,
  target: "web",
  serve: {
    port: 1337,
    content: './dist'
  },
  externals: ['react'],
  stats: "errors-only",
  devServer: {
    contentBase: '/assets/',
    publicPath: '/assets/',
    compress: true,
    clientLogLevel: 'none',
    inline: true,
    port: '3000',
    host: '0.0.0.0',
    disableHostCheck: true,
    noInfo: false,
    lazy: false,
    overlay: true,
    watchContentBase: true,
    historyApiFallback: true
  },
  plugins: []
}
