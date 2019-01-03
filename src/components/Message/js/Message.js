import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Message extends Component {
  static propTypes = {
    theme: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ]),
    noMargin: PropTypes.bool
  };

  getCssClasses() {
    const { theme, noMargin } = this.props;
    let cssClasses = ['tyk-message'];

    cssClasses.push('tyk-message--' + (theme || 'info'));

    if(noMargin) {
      cssClasses.push('no-margin');
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div className={ this.getCssClasses() }>
        { this.props.children }
      </div>
    );
  }
}
