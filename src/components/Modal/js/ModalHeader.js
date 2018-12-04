import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ModalContext } from './Modal.js';

export default class ModalHeader extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ])
  };

  render() {
    return (
      <ModalContext.Consumer>
        {
          (modalContext) => {

            return (
              <div className="tyk-modal__header">
                <button type="button" className="close" onClick={ modalContext.closeModal }>&times;</button>
                { this.props.children }
              </div>
            );
          }
        }
      </ModalContext.Consumer>
    );
  }
}
