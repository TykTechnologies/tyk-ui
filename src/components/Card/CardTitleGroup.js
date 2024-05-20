import React from 'react';
import PropTypes from 'prop-types';

function CardTitleGroup({
  children,
}) {
  return (
    <div className="tyk-card__title-group">
      {children}
    </div>
  );
}

CardTitleGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardTitleGroup;
