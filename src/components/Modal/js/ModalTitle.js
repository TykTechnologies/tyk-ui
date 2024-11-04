import React from 'react';
import PropTypes from 'prop-types';

function ModalTitle({ children }) {
  return (
    <h5 className="tyk-modal__title">
      { children }
    </h5>
  );
}

ModalTitle.propTypes = {
  children: PropTypes.element,
};

export default ModalTitle;
