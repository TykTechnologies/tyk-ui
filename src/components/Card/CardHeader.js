import React from 'react';
import PropTypes from 'prop-types';

function CardHeader({
  right = null,
  children,
}) {
  return (
    <div className="tyk-card__header">
      {children && <div className="tyk-card__header-content">{children}</div>}
      {right && <div className="tyk-card__header-right">{right}</div>}
    </div>
  );
}

CardHeader.propTypes = {
  right: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardHeader;
