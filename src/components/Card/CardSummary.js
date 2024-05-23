import React from 'react';
import PropTypes from 'prop-types';

function CardSummary({
  maxLines = 2, // accepted values: 1, 2, 3, 4, 5
  children,
}) {
  return (
    <p className={`tyk-card__summary tyk-card__summary--max-${maxLines}-lines`}>
      {children}
    </p>
  );
}

CardSummary.propTypes = {
  maxLines: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardSummary;
