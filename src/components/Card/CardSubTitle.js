import React from 'react';
import PropTypes from 'prop-types';

function CardSubTitle({
  children,
}) {
  return (
    <h5 className="tyk-card__sub-title">
      {children}
    </h5>
  );
}

CardSubTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardSubTitle;
