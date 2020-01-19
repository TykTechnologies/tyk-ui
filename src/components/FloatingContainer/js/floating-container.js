import React, {
  useEffect, useRef, forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

function FloatingContainer(props) {
  const {
    element,
    size = 'auto',
    forceDisplay = 'auto',
    displayAxis = 'vertical',
    offset = 0,
    className,
    children,
    passedRef,
  } = props;
  const localRef = useRef(null);
  const floatingContainerRef = passedRef || localRef;


  function determineDisplay() {
    const target = element.current;
    const container = floatingContainerRef.current;
    if (!container) return 'bottom';

    if (displayAxis === 'vertical') {
      const { top } = target.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const topSpace = windowHeight - top;
      const bottomSpace = windowHeight - top - target.offsetHeight;
      const hasBottomSpace = bottomSpace > container.scrollHeight;
      return hasBottomSpace || bottomSpace > topSpace ? 'bottom' : 'top';
    }

    const { left } = target.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const leftSpace = windowWidth - left;
    const rightSpace = windowWidth - left - target.offsetWidth;
    const hasRightSpace = rightSpace > container.offsetWidth;
    return hasRightSpace || rightSpace > leftSpace ? 'right' : 'left';
  }

  function adjustPosition() {
    const display = forceDisplay !== 'auto' ? forceDisplay : determineDisplay();
    const target = element.current;
    const container = floatingContainerRef.current;
    const targetPosition = target.getBoundingClientRect();

    if (display === 'top') {
      const topPos = targetPosition.top - container.offsetHeight - offset;
      container.style.top = `${topPos}px`;
      container.style.left = (size === 'auto'
        ? `${targetPosition.left + target.offsetWidth / 2 - container.offsetWidth / 2}px`
        : `${targetPosition.left}px`);
      if (size === 'matchElement') {
        container.style.width = `${target.offsetWidth}px`;
      } else if (typeof size === 'function') {
        container.style.width = `${size(target.offsetWidth)}px`;
      }
      container.style.maxHeight = `${targetPosition.top - offset}px`;
    }

    if (display === 'bottom') {
      container.style.top = `${targetPosition.bottom + offset}px`;
      container.style.left = size === 'auto'
        ? `${targetPosition.left + target.offsetWidth / 2 - container.offsetWidth / 2}px`
        : `${targetPosition.left}px`;
      if (size === 'matchElement') {
        container.style.width = `${target.offsetWidth}px`;
      } else if (typeof size === 'function') {
        container.style.width = `${size(target.offsetWidth)}px`;
      }
      container.style.maxHeight = `${window.innerHeight - targetPosition.bottom - offset}px`;
    }

    if (display === 'left') {
      const topPos = targetPosition.top + target.offsetHeight / 2 - container.offsetHeight / 2;
      container.style.top = size === 'auto'
        ? `${topPos}px`
        : `${targetPosition.top}px`;
      container.style.left = `${targetPosition.left - container.offsetWidth - offset}px`;
      if (size === 'matchElement') {
        container.style.height = `${target.offsetHeight}px`;
      } else if (typeof size === 'function') {
        container.style.height = `${size(target.offsetHeight)}px`;
      }
      container.style.maxWidth = `${targetPosition.left - offset}px`;
    }

    if (display === 'right') {
      const topPos = targetPosition.top + target.offsetHeight / 2 - container.offsetHeight / 2;
      container.style.top = size === 'auto'
        ? `${topPos}px`
        : `${targetPosition.top}px`;
      container.style.left = `${targetPosition.left + target.offsetWidth + offset}px`;
      if (size === 'matchElement') {
        container.style.height = `${target.offsetHeight}px`;
      } else if (typeof size === 'function') {
        container.style.height = `${size(target.offsetHeight)}px`;
      }
      container.style.maxWidth = `${window.innerWidth - targetPosition.left - target.offsetWidth - offset}px`;
    }
  }

  useEffect(() => {
    window.requestAnimationFrame(function schedulePositionUpdate() {
      adjustPosition();
      window.requestAnimationFrame(schedulePositionUpdate);
    });
  }, []);

  return createPortal(
    <div
      className={`floating-container ${className || ''}`}
      ref={floatingContainerRef}
    >
      {children}
    </div>,
    document.querySelector('body'),
  );
}

FloatingContainer.propTypes = {
  element: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 'matchElement']),
    PropTypes.func,
  ]),
  offset: PropTypes.number,
  forceDisplay: PropTypes.oneOf(['auto', 'top', 'bottom', 'left', 'right']),
  displayAxis: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default forwardRef((props, ref) => <FloatingContainer {...props} passedRef={ref} />);
