import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {
  static propTypes = {
    theme: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    noMargin: PropTypes.bool,
  };

  getCssClasses() {
    const { theme, noMargin, className } = this.props;
    let cssClasses = ['tyk-message'];

    cssClasses.push(`tyk-message--${theme || 'info'}`);

    if (noMargin) {
      cssClasses.push('no-margin');
    }

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    const { children } = this.props;

    return (
      <div className={this.getCssClasses()}>
        { children }
      </div>
    );
  }
}
