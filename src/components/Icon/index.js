import React from 'react';
import PropTypes from 'prop-types';

function Icon({
  className,
  family,
  type,
  weight,
  ...rest
}) {
  function getCSSClasses() {
    const fontFamily = family || 'fa';
    const fontWeight = fontFamily === 'fa' ? `fa-${weight || 'light'}` : '';

    return [
      'tyk-icon',
      fontFamily !== 'fa' && fontFamily,
      `${fontFamily}-${type}`,
      fontWeight,
      className,
    ].filter(Boolean).join(' ');
  }

  return <i className={getCSSClasses()} {...rest} />;
}

Icon.propTypes = {
  // Additional CSS classes to apply
  className: PropTypes.string,
  // Font family to use. Default is 'fa'.
  family: PropTypes.string,
  // Icon type to use
  type: PropTypes.string.isRequired,
  // Icon weight to use. Only applicable for Font Awesome icons. Default is 'light'. Also supports 'solid'
  weight: PropTypes.string
};

export default Icon;
