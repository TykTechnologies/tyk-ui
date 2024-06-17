import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import debounce from '../../utils/debounce';

/**
 * FixedWrapper component, keeps all its children in a fix position on the page,
 * even if the scroll position changes
 * i.e: The top navigation bar of a page sits within FixedWrapper component
 */
function FixedWrapper({ children, className, showShadow }) {
  const fixedWrapperRef = useRef(null);

  const attachShadow = useCallback(() => {
    const element = fixedWrapperRef.current;

    if (!element) {
      return;
    }

    if (window.scrollY) {
      element.classList.add('tyk-fixed-wrapper--scrolled');
    } else {
      element.classList.remove('tyk-fixed-wrapper--scrolled');
    }
  }, [fixedWrapperRef.current]);

  const debouncedAttachShadow = useCallback(debounce(attachShadow, 100), [attachShadow]);

  useEffect(() => {
    if (showShadow) {
      window.addEventListener('scroll', debouncedAttachShadow);
    }

    return () => {
      window.removeEventListener('scroll', debouncedAttachShadow);
    };
  }, [debouncedAttachShadow, showShadow]);

  return (
    <div className={`tyk-fixed-wrapper ${className}`} ref={fixedWrapperRef}>
      { children }
    </div>
  );
}

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
