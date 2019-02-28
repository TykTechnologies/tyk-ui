import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Row extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    className: PropTypes.string,
    noGutters: PropTypes.bool,
  }

  getCssClasses() {
    const { className, noGutters } = this.props;
    let cssClass = ['tyk-row'];

    if (noGutters) {
      cssClass.push('no-gutters');
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
      <div className={this.getCssClasses()} {...this.props}>
        { children }
      </div>
    );
  }
}
