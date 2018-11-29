import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Icon extends Component {
  static propTypes = {
    familly: PropTypes.string,
    type: PropTypes.string.isRequired
  };

  getCssClasses() {
    let cssClasses = [];
    let fontFamily = this.props.family || 'fa';

    cssClasses.push(fontFamily);
    cssClasses.push(fontFamily + '-' + this.props.type);

    return cssClasses
      .concat([this.props.className] || [])
      .join(' ');
  }

  render() {
    return(
      <i className={ this.getCssClasses() }></i>
    );
  }
}
