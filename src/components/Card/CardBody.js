import React from 'react';
import PropTypes from 'prop-types';

function CardBody({
  align = 'top',
  children,
}) {
  return (
    <div className={`tyk-card__body tyk-card__body--align-${align}`}>
      <div>
        {children}
      </div>
    </div>
  );
}

CardBody.propTypes = {
  align: PropTypes.oneOf(['top', 'center', 'bottom']),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default CardBody;
