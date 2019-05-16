import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Row extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    className: PropTypes.string,
    nogutters: PropTypes.string,
  }

  getCssClasses() {
    const { className, nogutters } = this.props;
    let cssClass = ['tyk-row'];

    if (nogutters) {
      cssClass.push('no-gutters');
      cssClass.push('tyk-row--gutterless');
    }

    if (className) {
      cssClass = cssClass.concat(className.split(' '));
    }

    return cssClass.join(' ');
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <div {...this.props} className={this.getCssClasses()}>
        { children }
      </div>
    );
  }
}
