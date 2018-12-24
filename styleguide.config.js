const { version } = require('./package');
const path = require('path');

module.exports = {
	defaultExample: false,
	version,
	styleguideDir: 'tyk-ui-styleguide',
	components: ['src/components/**/index.js', 'src/components/**/examples.js'],
	ignore: [
		'**/components/Collapsible/index.js',
		'**/components/Column/index.js',
		'**/components/Row/index.js'
	],
	require: [
    path.join(__dirname, 'src/common/sass/index.scss')
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
