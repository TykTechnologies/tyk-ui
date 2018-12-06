const { version } = require('./package');

module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	version,
	styleguideDir: 'tyk-ui-styleguide',
	components: ['src/components/**/index.js', 'src/components/**/examples.js'],
	ignore: [
		'**/components/Collapsible/index.js'
	],
	webpackConfig: {
		module: {
			rules: [
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
	          "sass-loader?sourceMap"
	        ]
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
};
