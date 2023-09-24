import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Icon({
  className,
  family,
  type,
  hoverIconType,
  ...rest
}) {
  const [isHovered, setIsHovered] = useState(false);
  function getCSSClasses(showHoverIcon) {
    const fontFamily = family || 'fa';

    return [
      'tyk-icon',
      fontFamily,
      `${fontFamily}-${showHoverIcon ? hoverIconType : type}`,
      className,
    ].filter(Boolean).join(' ');
  }

  const toggleHover = () => setIsHovered(!isHovered);

  return (
    <span onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
      {isHovered && hoverIconType ? <i className={getCSSClasses(true)} {...rest} /> : <i className={getCSSClasses()} {...rest} />}
    </span>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  family: PropTypes.string,
  hoverIconType: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default Icon;
