import React from 'react';
import PropTypes from 'prop-types';

function CardTitle({
  maxLines = 1, // accepted values: 1, 2
  children,
}) {
  return (
    <h4 className={`tyk-card__title tyk-card__title--max-${maxLines}-lines`}>
      {children}
    </h4>
  );
}

CardTitle.propTypes = {
  maxLines: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardTitle;
