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
    let cssClass = ['tyk-row'];

    if (this.props.noGutters) {
      cssClass.push('no-gutters');
    }

    if (this.props.className) {
      cssClass = cssClass.concat(this.props.className.split(' '));
    }

    return cssClass.join(' ');
  }

  render() {
    return (
      <div className={this.getCssClasses()} {...this.props}>
        { this.props.children }
      </div>
    );
  }
}
