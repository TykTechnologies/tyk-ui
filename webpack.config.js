const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'tyk-ui': path.resolve(__dirname, 'src/index.js'),
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './lib/'),
    filename: '[name].js',
    library: {
      type: 'commonjs2'
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: [/images/],
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: [/fonts/],
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*.scss',
          to: 'sass/',
          context: 'src/',
        },
      ],
    }),
    new ESLintPlugin({
      fix: true,
      lintDirtyModulesOnly: true,
    }),
  ],
  devtool: 'source-map',
  externals: {
    react: 'commonjs2 react',
    'react-dom': 'commonjs2 react-dom',
    'react-ace': 'commonjs2 react-ace',
    'react-datetime-picker': 'commonjs2 react-datetime-picker',
    'react-transition-group': 'commonjs2 react-transition-group',
    brace: 'commonjs2 brace',
    echarts: 'commonjs2 echarts',
    flatpickr: 'commonjs2 flatpickr',
    immutable: 'commonjs2 immutable',
    'prop-types': 'commonjs2 prop-types',
  },
  stats: 'verbose',
};
