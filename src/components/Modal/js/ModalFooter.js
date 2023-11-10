import React from 'react';
import PropTypes from 'prop-types';

function ModalFooter({ children }) {
  return (
    <div className="tyk-modal__footer">
      { children }
    </div>
  );
}

ModalFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default ModalFooter;
