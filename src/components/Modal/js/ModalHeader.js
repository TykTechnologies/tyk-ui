import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import { ModalContext } from './Modal';

const ModalHeader = (props) => {
  const { children } = props;

  return (
    <ModalContext.Consumer>
      {
        modalContext => (
          <div className="tyk-modal__header">
            { children }
            <Button onClick={modalContext.closeModal} iconType="times" iconPosition="left" />
          </div>
        )
      }
    </ModalContext.Consumer>
  );
};

ModalHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default ModalHeader;
