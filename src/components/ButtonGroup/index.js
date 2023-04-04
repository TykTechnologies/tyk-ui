import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tyk button component.
 */
function ButtonGroup({
  className,
  children,
  label,
}) {
  return (
    <div className={`tyk-button-group__wrapper ${className}`}>
      {Boolean(label) && (
        <label>{label}</label>
      )}
      <div className="tyk-button-group">
        {children}
      </div>
    </div>
  );
}

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  /**
  * Label that will sit above the button group
  */
  label: PropTypes.string,
};

export default ButtonGroup;
