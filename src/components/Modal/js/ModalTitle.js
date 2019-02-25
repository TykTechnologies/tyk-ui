import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ModalTitle extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
  };

  render() {
    return (
      <h4 className="tyk-modal__title">
        { this.props.children }
      </h4>
    );
  }
}
