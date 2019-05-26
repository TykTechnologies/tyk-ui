import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Loader extends Component {
  static propTypes = {
    className: PropTypes.string,
    position: PropTypes.string,
    withbackground: PropTypes.bool,
  };

  getCssClasses() {
    let cssClasses = ['loading'];
    const { className, position } = this.props;

    cssClasses.push(position || 'absolute');

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  }

  getLoaderComponent() {
    return (
      <div className={this.getCssClasses()}>
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
        <div className="loading-bar" />
      </div>
    );
  }

  render() {
    const { withbackground } = this.props;

    return (
      <Fragment>
        {
          withbackground
            ? (
              <div className="tyk-loading__wrapper">
                {this.getLoaderComponent()}
              </div>
            )
            : this.getLoaderComponent()
        }
      </Fragment>
    );
  }
}
