import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    family: PropTypes.string,
    type: PropTypes.string.isRequired,
  };

  getCssClasses() {
    const {
      className,
      family,
      type,
    } = this.props;

    const cssClasses = ['tyk-icon'];
    const fontFamily = family || 'fa';

    cssClasses.push(fontFamily);
    cssClasses.push(`${fontFamily}-${type}`);

    return cssClasses
      .concat([className] || [])
      .join(' ');
  }

  render() {
    return (
      <i className={this.getCssClasses()} />
    );
  }
}
