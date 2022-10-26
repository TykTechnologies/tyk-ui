const { defineConfig } = require('cypress');
const cypressCoverageTask = require('@cypress/code-coverage/task');

const webpackConfig = require('./webpack.component');

module.exports = defineConfig({
  includeShadowDom: true,
  video: false,
  viewportWidth: 1024,
  viewportHeight: 768,
  component: {
    specPattern: 'src/**/*.test.js',
    supportFile: 'cypress/support/component.js',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    setupNodeEvents(on, config) {
      cypressCoverageTask(on, config);
      return config;
    },
  },
});
