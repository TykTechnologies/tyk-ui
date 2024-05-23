import React from 'react';
import PropTypes from 'prop-types';

function CardFooter({ children }) {
  return (
    <div className="tyk-card__footer">
      {children}
    </div>
  );
}

CardFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardFooter;
