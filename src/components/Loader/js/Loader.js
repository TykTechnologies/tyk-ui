import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loader extends Component {
  static propTypes = {
    position: PropTypes.string,
  };

  getCssClasses() {
    const cssClasses = ['loading'];
    const { position } = this.props;

    cssClasses.push(position || 'absolute');

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div className={this.getCssClasses()}>
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
      </div>
    );
  }
}
