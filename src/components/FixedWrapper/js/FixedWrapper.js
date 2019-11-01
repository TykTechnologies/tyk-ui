import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Utils from '../../Utils';

const FixedWrapper = (props) => {
  const {
    children,
    className,
    showShadow,
  } = props;

  const fixedWrapperRef = useRef(null);

  const attachShadow = () => {
    const element = fixedWrapperRef.current;

    if (window.scrollY) {
      if (!element.classList.contains('tyk-fixed-wrapper--scrolled')) {
        element.classList.add('tyk-fixed-wrapper--scrolled');
      }
    } else {
      element.classList.remove('tyk-fixed-wrapper--scrolled');
    }
  };

  useEffect(() => {
    if (showShadow) {
      window.addEventListener('scroll', Utils.debounce(attachShadow, 100));
    }

    return () => {
      window.removeEventListener('scroll', Utils.debounce(attachShadow, 100));
    };
  }, [attachShadow, showShadow]);

  return (
    <div className={`tyk-fixed-wrapper ${className}`} ref={fixedWrapperRef}>
      { children }
    </div>
  );
};

FixedWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  showShadow: PropTypes.bool,
};

FixedWrapper.defaultProps = {
  className: '',
};

export default FixedWrapper;
