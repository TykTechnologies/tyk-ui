
const React = require('react')
const { version } = require('../../package.json')

const Logo = () => {
  return (
    <a
      className="rsg-logo"
      href="https://github.com/TykTechnologies/tyk-ui"
      target="_blank"
    >
      <span className="rsg-logo-name">Tyk-UI</span>
      <em className="rsg-logo-version">v.{version}</em>
    </a>
  );
};

module.exports = Logo
