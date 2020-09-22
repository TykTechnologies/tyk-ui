const { version } = require('./package');
const path = require('path');

module.exports = {
	defaultExample: false,
	title: 'Tyk UI',
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
	require: [
    path.join(__dirname, 'src/index.scss')
  ],
	// components: 'src/components/**/index.js',
	// resolver: require('react-docgen').resolver.findAllExportedComponentDefinitions,
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
	sections: [
		{
			name: 'Getting Started',
			content: 'docs/Documentation.md',
			usageMode: 'collapse',
			sections: [
				{
					name: 'Prerequisite',
					content: 'docs/PreRequisite.md',
				},
				{
					name: 'Contributing',
					content: 'docs/AddingComponents.md',
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
			content: 'docs/Theming.md',
			sectionDepth: 2,
		},
		{
			name: 'Font and Typography',
			content: 'docs/Theming.md',
			sectionDepth: 2,
		},
		{
			name: 'Hooks',
			components: 'src/hooks/**/*.md',
			sectionDepth: 2,
		},
		{
			name: 'Layout',
			content: 'docs/Theming.md',
			sectionDepth: 2,
		},
		{
			name: 'Typography',
			content: 'docs/Theming.md',
			sectionDepth: 2,
		},
		{
			name: 'Components',
			components: 'src/components/**/index.js',
			tocMode: "collapse",
			sectionDepth: 2,
			
		},
		{
			name: 'Form',
			components: 'src/form/**/index.js',
			sectionDepth: 2,
		},
		{
			name: 'Utilities',
			// content: 'docs/Theming.md',
			sectionDepth: 2,
		},
	]
};
