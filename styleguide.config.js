const { version } = require('./package');

module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
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
	          "sass-loader?sourceMap"
	        ]
	      },
	      {
	        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
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
};
