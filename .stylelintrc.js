module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-use-logical-spec',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  ignoreFiles: [
    'src/common/css/fontawesome.css',
    'src/common/css/tykon.css'
  ],
  rules: {
    'color-function-notation': ['modern', { ignore: ['with-var-inside'] }],
    'color-hex-length': null,
    'custom-property-empty-line-before': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'import-notation': 'string',
    'liberty/use-logical-spec': true,
    'no-descending-specificity': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'property-no-vendor-prefix': [true, { ignoreProperties: ['full-screen', 'mask', 'mask-size', 'user-select'] }],
    'selector-class-pattern': null,
    'selector-no-vendor-prefix': [true, { ignoreSelectors: [':-webkit-full-screen', ':-ms-input-placeholder'] }],
  }
};
