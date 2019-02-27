import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import { ModalContext } from './Modal.js';

export default class ModalHeader extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
  };

  render() {
    return (
      <ModalContext.Consumer>
        {
          modalContext => (
            <div className="tyk-modal__header">
              { this.props.children }
              <Button onClick={modalContext.closeModal} iconType="times" iconPosition="left" />
            </div>
          )
        }
      </ModalContext.Consumer>
    );
  }
}
