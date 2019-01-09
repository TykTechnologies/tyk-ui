const { version } = require('./package');
const path = require('path');

module.exports = {
	defaultExample: false,
	version,
	styleguideDir: 'tyk-ui-styleguide',
	ignore: [
		'**/components/Collapsible/**/*.js',
		'**/components/Column/**/*.js',
		'**/components/Combobox/**/FieldCombobox.js',
		'**/components/DateTimePicker/**/FieldDatetimePicker.js',
		'**/components/Dropdown/**/DropdownItem.js',
		'**/components/Dropdown/**/FieldDropdown.js',
		'**/components/EditableList/**/EditableListForm.js',
		'**/components/EditableList/**/FieldEditableList.js',
		'**/components/FileInput/**/FieldFileInput.js',
		'**/components/Input/**/FieldInput.js',
		'**/components/Modal/**/ModalBody.js',
		'**/components/Modal/**/ModalFooter.js',
		'**/components/Modal/**/ModalHeader.js',
		'**/components/Modal/**/ModalTitle.js',
		'**/components/Pagination/**/FieldPagination.js',
		'**/components/Panel/**/PanelBody.js',
		'**/components/Panel/**/PanelHeader.js',
		'**/components/Select/**/FieldSelect.js',
		'**/components/Row/**/*.js',
		'**/components/Tabs/**/Tab.js'
	],
	getExampleFilename(componentPath) {
		let path = componentPath.split('/');
		let componentName = path[path.length-1];
		let finameComponentPath = componentPath.replace('js/' + componentName, 'Readme.md');

    return finameComponentPath;
  },
	require: [
    path.join(__dirname, 'src/index.scss')
  ],
	resolver: require('react-docgen').resolver.findAllExportedComponentDefinitions,
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
