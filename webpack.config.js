const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractAppCSS = new MiniCssExtractPlugin({
  filename: '[name].css'
});
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function getEntries(pattern) {
  const entries = {};

  glob.sync(pattern).forEach((file) => {
    let key = file.replace('src/', '').replace('.js', '');

    entries[key] = path.join(__dirname, file);
  });
  return entries;
}

let entries = getEntries('src/components/**/js/*');
console.log(entries);
entries.index = path.resolve(__dirname, "src/index.js");

module.exports = {
  mode: "development",
  entry: entries,
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  devtool: "source-map",
  externals: ['react'],
  stats: "verbose"
}
