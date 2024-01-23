import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const ButtonGroup = forwardRef(
  ({ className, children, label }, ref) => (
    <div ref={ref} className={`tyk-button-group__wrapper ${className}`}>
      {Boolean(label) && <label>{label}</label>}
      <div className="tyk-button-group">{children}</div>
    </div>
  ),
);

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ButtonGroup;
