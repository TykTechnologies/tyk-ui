import React from 'react';
import PropTypes from 'prop-types';

function CardBody({ children }) {
  return (
    <div className="tyk-card__body">
      {children}
    </div>
  );
}

CardBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardBody;
