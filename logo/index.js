const React = require('react')
const { version } = require('../package.json')

const Logo = () => {
  return (
    <a
      className="rsg-logo"
      href="https://github.com/TykTechnologies/tyk-ui"
      target="_blank"
    >
      <img src="https://tyk.io/wp-content/themes/tyk/dist/svg/logo.svg" width="190px" height="62px"/>
      <em className="rsg-logo-version">v.{version}</em>
    </a>
  );
};

module.exports = Logo