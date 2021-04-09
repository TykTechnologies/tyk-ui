import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import { ModalContext } from '../modal-context';

const ModalHeader = ({
  children,
  hideCloseButton = false,
}) => (
  <ModalContext.Consumer>
    {
      modalContext => (
        <div className="tyk-modal__header">
          { children }
          {!hideCloseButton && <Button onClick={modalContext.closeModal} iconType="times" iconOnly theme="white" iconPosition="left" />}
        </div>
      )
    }
  </ModalContext.Consumer>
);

ModalHeader.propTypes = {
  hideCloseButton: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default ModalHeader;
