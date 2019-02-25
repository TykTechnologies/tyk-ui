import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ModalFooter extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
  };

  render() {
    return (
      <div className="tyk-modal__footer">
        { this.props.children }
      </div>
    );
  }
}
