import React from 'react';
import PropTypes from 'prop-types';

function CardTitleIcon({
  children,
}) {
  return (
    <div className="tyk-card__title-icon">
      {children}
    </div>
  );
}

CardTitleIcon.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardTitleIcon;
