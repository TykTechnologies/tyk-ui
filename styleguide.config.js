const { version } = require('./package');
const path = require('path');
const {styles, theme} = require('./styleguide.styles');

module.exports = {
	defaultExample: false,
	title: `Tyk UI ${version}`,
	styleguideDir: 'tyk-ui-styleguide',
	require: [
    path.join(__dirname, 'src/index.scss')
	],
	styleguideComponents: {
    Logo: path.join(__dirname, 'logo')
	},
	template: {
		favicon: 'https://tyk.io/wp-content/uploads/2019/08/cropped-favicon-384x384.png'
	},
	webpackConfig: {
		module: {
			rules: [
	      {
	        enforce: "pre",
	        test: /.js?$/,
	        include: [
	          path.resolve(__dirname, "src")
	        ],
	        exclude: /node_modules/,
	        loader: "eslint-loader",
					options: {
						fix: true
					}
	      },
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
        	options: { babelrcRoots: ['.', '../'] }
				},
				{
					test: /\.css$/,
	        use: [
	          "style-loader",
	          "css-loader"
	        ]
				},
	      {
	        test: /\.scss$/,
	        use: [
	          "style-loader",
	          "css-loader",
	          {
	            loader: "resolve-url-loader",
	            options: {
	              debug: true
	            }
	          },
	          "sass-loader?sourceMap"
	        ]
				},
				{
	        test: /\.md$/,
	        use: {
	          loader: 'file-loader',
	          options: {
	            name: 'docs/[name].[ext]'
	          }
	        }
	      },
	      {
	        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
	        use: {
	          loader: 'file-loader',
	          options: {
	            name: 'fonts/[name].[ext]'
	          }
	        }
	      }
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
			components: 'src/hooks/**/*.md',
			sectionDepth: 2,
		},
		{
			name: 'Layout',
			content: 'src/layout/Readme.md',
			components: 'src/layout/**/index.js',
			sectionDepth: 2,
			tocMode: "collapse",
			usageMode: 'expand',
			exampleMode: 'expand'
		},
		{
			name: 'Typography',
			content: 'src/typography/Readme.md',
			sectionDepth: 2,
		},
		{
			name: 'Components',
			components: 'src/components/**/index.js',
			tocMode: "collapse",
			sectionDepth: 2,
			usageMode: 'expand',
			exampleMode: 'expand'
		},
		{
			name: 'Form',
			sections: [
				{
					name: 'Components',
					components: 'src/form/components/*/index.js',
					usageMode: 'expand',
					exampleMode: 'expand'
				},
				{
					name: 'Formik',
					components: 'src/form/formik/*/index.js',
				},
				{
					name: 'Redux-Form',
					components: 'src/form/redux-form/*/index.js',
				},
			],
			sectionDepth: 2,
		},
		{
			name: 'Utilities',
			components: 'src/utils/**/*.md',
			usageMode: 'expand',
			exampleMode: 'expand',
			sectionDepth: 2,
		},
	]
};
