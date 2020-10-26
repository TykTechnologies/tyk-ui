
const React = require('react')
const { version } = require('../../package.json')

const Logo = () => {
  return (
    <a
      className="rsg-logo"
      href="https://github.com/TykTechnologies/tyk-ui"
      target="_blank"
    >
      <img src="#" width="190px" height="62px"/>
      {"_________"}<em className="rsg-logo-version">v.{version}</em>{"_________"}
    </a>
  );
};

module.exports = Logo
