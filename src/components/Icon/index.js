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
  className: PropTypes.string,
  family: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Icon;
