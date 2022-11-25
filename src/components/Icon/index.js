import React from 'react';
import PropTypes from 'prop-types';

function Icon({
  className,
  family,
  type,
  ...rest
}) {
  function getCSSClasses() {
    const fontFamily = family || 'fa';

    return [
      'tyk-icon',
      fontFamily,
      `${fontFamily}-${type}`,
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
