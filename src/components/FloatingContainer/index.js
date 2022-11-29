import React, {
  useEffect, useRef, forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import InfiniteScroller from '../InfiniteScroller';

/**
 * It displays a container relative to another element.
 * Meant to be used for dropdowns, tooltips, and other similar components.
 */
function FloatingContainer(props) {
  const {
    /** A DOM element that the floating container will be displayed relative to. */
    element,
    /** The size of the container.
     * If `auto` the size will be determined by its contents.
     * If `matchElement` it will take the width or the height of the element depending
     * on the `displayAxis` prop.
     * It can also be a function that returns a number representing the width
     * or the height in pixels.
     */
    size = 'auto',
    /**
     * If `auto` the component will try to determine where to display the container relative to the
     * element (top, bottom, left, right).
     * It can also be one of top, bottom, left, right, to force the floating container to always be
     * displayed in that position.
     */
    forceDisplay = 'auto',
    /**
     * It can be `auto`, `vertical` or `horizontal`. It specifies the axis where
     * it will be displayed when `forceDisplay` is `auto`.
     */
    displayAxis = 'auto',
    /**
     * If there is space on both sides of the axis preffer this side.
     */
    preferredPosition,
    /**
     * The distance between the element and the floating container.
     * It can be positive or negative.
     */
    offset = 0,
    className,
    children,
    /**
     * A reference for the container. Used in cases where you need some DOM
     * control from outside the component.
     */
    passedRef,
    /**
     * Configuration object that will be passed to the infinite scroller component.
     */
    infiniteScrollerConfig,
  } = props;
  const localRef = useRef(null);
  const floatingContainerRef = passedRef || localRef;
  const contentWrapperRef = useRef(null);

  function determineDisplay() {
    const target = element.current;
    const container = floatingContainerRef.current;
    if (!container) return preferredPosition ?? displayAxis === 'vertical' ? 'bottom' : 'right';

    const { left, top } = target.getBoundingClientRect();
    const topSpace = top;
    const bottomSpace = window.innerHeight - top - target.offsetHeight;
    const leftSpace = left;
    const rightSpace = window.innerWidth - left - target.offsetWidth;
    const hasTopSpace = topSpace > container.scrollHeight;
    const hasBottomSpace = bottomSpace > container.scrollHeight;
    const hasLeftSpace = leftSpace > container.offsetWidth;
    const hasRightSpace = rightSpace > container.offsetWidth;
    const positionedVerticallyFitsInViewport = left + target.offsetWidth / 2 - container.offsetWidth / 2 > 0; // eslint-disable-line max-len
    const positionedHorizontallyFitsInViewport = top + target.offsetHeight / 2 - container.scrollHeight / 2 > 0; // eslint-disable-line max-len

    if (
      displayAxis === 'vertical'
      || (
        displayAxis === 'auto'
        && (hasTopSpace || hasBottomSpace)
        && positionedVerticallyFitsInViewport
      )
    ) {
      if (preferredPosition === 'top' && hasTopSpace) return 'top';
      if (preferredPosition === 'bottom' && hasBottomSpace) return 'bottom';
      return hasBottomSpace || bottomSpace > topSpace ? 'bottom' : 'top';
    }

    if (displayAxis === 'horizontal') {
      if (preferredPosition === 'left' && hasLeftSpace) return 'left';
      if (preferredPosition === 'right' && hasLeftSpace) return 'right';
      return hasRightSpace || rightSpace > leftSpace ? 'right' : 'left';
    }

    if (hasTopSpace && positionedVerticallyFitsInViewport) return 'top';
    if (hasBottomSpace && positionedVerticallyFitsInViewport) return 'bottom';
    if (hasRightSpace && positionedHorizontallyFitsInViewport) return 'right';
    if (hasLeftSpace && positionedHorizontallyFitsInViewport) return 'left';
    return 'right';
  }

  function adjustPosition() {
    const display = forceDisplay !== 'auto' ? forceDisplay : determineDisplay();
    const target = element.current;
    const container = floatingContainerRef.current;

    if (!target || !container) return;

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
      <InfiniteScroller
        refChild={contentWrapperRef}
        {...infiniteScrollerConfig}
      >
        <div
          className="floating-container__content-wrapper"
          ref={contentWrapperRef}
        >
          {children}
        </div>
      </InfiniteScroller>
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
  displayAxis: PropTypes.oneOf(['auto', 'vertical', 'horizontal']),
  preferredPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  infiniteScrollerConfig: PropTypes.instanceOf(Object),
};

export default forwardRef((props, ref) => <FloatingContainer {...props} passedRef={ref} />);
