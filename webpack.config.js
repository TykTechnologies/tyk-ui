const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractAppCSS = new MiniCssExtractPlugin({
  filename: '[name].css'
});

module.exports = {
  mode: "development",
  entry: {
    "index": path.resolve(__dirname, "./index"),
    "components/Button": path.resolve(__dirname, "./src/components/Button")
  },
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: '[name].js',
    library: "TykUI"
  },
  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "resolve-url-loader",
            options: {
              debug: true
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    ExtractAppCSS
  ],
  devtool: "source-map",
  externals: ['react'],
  stats: "verbose"
}
