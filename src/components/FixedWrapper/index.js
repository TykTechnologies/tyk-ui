import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import debounce from '../../utils/debounce';
/**
 * FixedWrapper component, keeps all its children in a fix position on the page,
 * even if the scroll position changes
 * i.e: The top navigation bar of a page sits within FixedWrapper component
 */
const FixedWrapper = (props) => {
  const {
    children,
    className,
    showShadow,
  } = props;

  const fixedWrapperRef = useRef(null);

  const attachShadow = () => {
    const element = fixedWrapperRef.current;

    if (!element) {
      return;
    }

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
      window.addEventListener('scroll', debounce(attachShadow, 100));
    }

    return () => {
      window.removeEventListener('scroll', debounce(attachShadow, 100));
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
  /** Css classes that can be passed to the FixedWraper element */
  className: PropTypes.string,
  /** If true, bottom shadow on the FixedWrapper component
   * is being displayed when scroll happens
   */
  showShadow: PropTypes.bool,
};

FixedWrapper.defaultProps = {
  className: '',
};

export default FixedWrapper;
