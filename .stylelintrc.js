module.exports = {
	extends: 'stylelint-config-standard-scss',
	plugins: [
		'stylelint-use-logical-spec',
		'stylelint-declaration-block-no-ignored-properties'
	],
	ignoreFiles: [
		'src/common/sass/fontawesome.scss',
		'src/common/sass/tykon.scss'
	],
	rules: {
		'color-hex-length': null,
		'custom-property-empty-line-before': null,
		'declaration-block-no-redundant-longhand-properties': null,
		'liberty/use-logical-spec': true,
		'no-descending-specificity': null,
		'plugin/declaration-block-no-ignored-properties': true,
		'property-no-vendor-prefix': [true, { ignoreProperties: ['full-screen', 'mask', 'mask-size', 'user-select'] }],
		'scss/at-extend-no-missing-placeholder': null,
		'scss/at-import-partial-extension': null,
		'scss/dollar-variable-empty-line-before': null,
		'scss/double-slash-comment-empty-line-before': null,
		'scss/percent-placeholder-pattern': null,
		'selector-class-pattern': null,
		'selector-no-vendor-prefix': [true, { ignoreSelectors: [':-webkit-full-screen', ':-ms-input-placeholder'] }],
	}
};
