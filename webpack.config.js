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
    let key = file.replace(/src\/components\/(.*)\/js\//g, '').replace('.js', '');
    entries[key] = path.join(__dirname, file);
  });
  return entries;
}

let entries = getEntries('src/components/**/js/*.js');
entries['tyk-ui'] = path.resolve(__dirname, "src/index.js");
entries.index = path.resolve(__dirname, "src/index.js");

module.exports = {
  mode: "production",
  entry: entries,
  output: {
    path: path.resolve(__dirname, "./lib/"),
    filename: '[name].js',
    library: "TykUI",
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/images/],
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
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: "resolve-url-loader",
            options: {
              debug: true,
              engine: 'postcss'
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
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
  externals: {
    'react': 'commonjs react',
    "react-dom": "ReactDOM",
    'moment': 'moment',
    'immutable': 'immutable'
  },
  stats: "verbose"
}
