import React from 'react';
import PropTypes from 'prop-types';

function ModalHeader({ children }) {
  return (
    <div className="tyk-modal__header">
      { children }
    </div>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default ModalHeader;
