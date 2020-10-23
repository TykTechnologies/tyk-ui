import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


/** Row component which must be always present as a wrapper for Columns */
export default class Row extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    /** Css classes that can be passed to the Row element */
    className: PropTypes.string,
    /** Removes all the spaces between column */
    nogutters: PropTypes.bool,
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
      nogutters,
      ...rest
    } = this.props;

    return (
      <div {...rest} className={this.getCssClasses()}>
        { children }
      </div>
    );
  }
}
