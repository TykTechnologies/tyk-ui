import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * The Message component is used to highlight important content to the users.
 *
 * If the content you are displaying needs immediate attention or is a feedback,
 * consider using `toast` instead
 */
export default class Message extends Component {
  static propTypes = {
    /** Set theme for message (eg. default, success, danger, etc) */
    theme: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    /** add a class to loader */
    className: PropTypes.string,
    /** Removes margins by adding `no-margin` class */
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
