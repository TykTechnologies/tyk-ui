const path = require('path');
const { version } = require('./package.json');
const { styles, theme } = require('./styleguide.styles');

module.exports = {
  defaultExample: false,
  title: `Tyk UI ${version}`,
  styleguideDir: 'tyk-ui-styleguide',
  require: [
    path.join(__dirname, 'src/index.scss'),
  ],
  styleguideComponents: {
    Logo: path.join(__dirname, 'logo'),
  },
  template: {
    favicon: 'https://tyk.io/wp-content/uploads/2019/08/cropped-favicon-384x384.png',
  },
  webpackConfig: {
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /.js?$/,
          include: [
            path.resolve(__dirname, 'src'),
          ],
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { babelrcRoots: ['.', '../'] },
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
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
        },
        {
          test: /\.md$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'docs/[name].[ext]',
            },
          },
        },
        {
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
      ],
    },
  },
  pagePerSection: true,
  styles,
  theme,
  sections: [
    {
      name: 'Getting Started',
      content: 'docs/GettingStarted.md',
      sections: [
        {
          name: 'Contributing',
          content: 'docs/Contributing.md',
        },
        {
          name: 'Publishing',
          content: 'docs/PublishingGuide.md',
        },
      ],
      sectionDepth: 2,
    },
    {
      name: 'Theming',
      content: 'docs/Theming.md',
      sectionDepth: 2,
    },
    {
      name: 'Globals',
      content: 'docs/Globals.md',
      sectionDepth: 2,
    },
    {
      name: 'Font and Typography',
      content: 'docs/Fonts.md',
      sectionDepth: 2,
    },
    {
      name: 'Hooks',
      content: 'src/hooks/Readme.md',
      components: 'src/hooks/**/index.js',
      ignore: 'src/hooks/index.js',
      sectionDepth: 2,
      tocMode: 'collapse',
      usageMode: 'expand',
      exampleMode: 'expand',
    },
    {
      name: 'Layout',
      content: 'src/layout/Readme.md',
      components: 'src/layout/**/index.js',
      sectionDepth: 2,
      tocMode: 'collapse',
      usageMode: 'expand',
      exampleMode: 'expand',
    },
    {
      name: 'Typography',
      content: 'src/typography/Readme.md',
      sectionDepth: 2,
    },
    {
      name: 'Components',
      components: 'src/components/**/index.js',
      tocMode: 'collapse',
      sectionDepth: 2,
      usageMode: 'expand',
      exampleMode: 'expand',
    },
    {
      name: 'Form Components',
      content: 'src/form/Readme.md',
      components: 'src/form/components/*/index.js',
      usageMode: 'expand',
      exampleMode: 'expand',
      sectionDepth: 2,
    },
    {
      name: 'Utilities',
      usageMode: 'expand',
      exampleMode: 'expand',
      sectionDepth: 2,
      sections: [
        { name: 'CSS Helpers', content: 'src/utils/css-helpers/Readme.md' },
        { name: 'debounce', content: 'src/utils/debounce/Readme.md' },
        { name: 'formik', content: 'src/utils/formik/Readme.md' },
      ],
    },
  ],
};
