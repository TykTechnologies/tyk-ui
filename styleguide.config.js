const { version } = require('./package');

module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	ribbon: {
		url: 'https://github.com/styleguidist/react-styleguidist',
	},
	version,
	styleguideDir: 'tyk-ui-styleguide',
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.js?$/,
					exclude: /node_modules|index\.js/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
	      {
	        test: /\.scss$/,
	        use: [
	          "style-loader",
	          "css-loader",
	          "sass-loader"
	        ]
	      }
			],
		},
	},
};
