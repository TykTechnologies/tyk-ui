import React from 'react';
import PropTypes from 'prop-types';

function ModalBody({ children }) {
  return (
    <div className="tyk-modal__body">
      { children }
    </div>
  );
}

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default ModalBody;
