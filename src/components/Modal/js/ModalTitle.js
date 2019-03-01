import React from 'react';
import PropTypes from 'prop-types';

const ModalTitle = (props) => {
  const { children } = props;
  return (
    <h4 className="tyk-modal__title">
      { children }
    </h4>
  );
};

ModalTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default ModalTitle;
