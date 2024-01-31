import React, {
  useEffect, useRef, forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import InfiniteScroller from '../InfiniteScroller';

const VIEWPORT_INITIAL_PADDING = 5;

/**
 * It displays a container relative to another element.
 * Meant to be used for dropdowns, tooltips, and other similar components.
 */
function FloatingContainer({
  element,
  size = 'auto',
  forceDisplay = 'auto',
  displayAxis = 'auto',
  preferredPosition,
  offset = 0,
  className,
  children,
  infiniteScrollerConfig,
}, ref) {
  const localRef = useRef(null);
  const floatingContainerRef = ref || localRef;
  const contentWrapperRef = useRef(null);
  // offset calculated on first render to make sure the floating container is inside the viewport
  const viewportOffset = useRef(null);

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
    return preferredPosition ?? 'bottom';
  }

  function adjustPosition() {
    const display = forceDisplay !== 'auto' ? forceDisplay : determineDisplay();
    const target = element.current;
    const container = floatingContainerRef.current;

    if (!target || !container) return;

    const targetPosition = target.getBoundingClientRect();
    const { left: vpLeft, top: vpTop } = viewportOffset.current ?? { left: 0, top: 0 };

    if (display === 'top') {
      const leftPos = {
        auto: targetPosition.left + target.offsetWidth / 2 - container.offsetWidth / 2,
        matchElement: targetPosition.left,
        matchStart: targetPosition.left,
        matchEnd: targetPosition.right - container.offsetWidth,
      }[size];
      const topPos = targetPosition.top - container.offsetHeight - offset;
      container.style.left = `${leftPos + vpLeft}px`;
      container.style.top = `${topPos + vpTop}px`;

      if (size === 'matchElement') {
        container.style.width = `${target.offsetWidth}px`;
      } else if (size === 'matchEnd') {
        container.style.maxWidth = `${targetPosition.right - VIEWPORT_INITIAL_PADDING}px`;
      } else if (typeof size === 'function') {
        container.style.width = `${size(target.offsetWidth)}px`;
      }
      container.style.maxHeight = `${targetPosition.top - offset}px`;
    }

    if (display === 'bottom') {
      const leftPos = {
        auto: targetPosition.left + target.offsetWidth / 2 - container.offsetWidth / 2,
        matchElement: targetPosition.left,
        matchStart: targetPosition.left,
        matchEnd: targetPosition.right - container.offsetWidth,
      }[size];
      const topPos = targetPosition.bottom + offset;
      container.style.left = `${leftPos + vpLeft}px`;
      container.style.top = `${topPos + vpTop}px`;

      if (size === 'matchElement') {
        container.style.width = `${target.offsetWidth}px`;
      } else if (size === 'matchEnd') {
        container.style.maxWidth = `${targetPosition.right - VIEWPORT_INITIAL_PADDING}px`;
      } else if (typeof size === 'function') {
        container.style.width = `${size(target.offsetWidth)}px`;
      }
      container.style.maxHeight = `${window.innerHeight - targetPosition.bottom - offset}px`;
    }

    if (display === 'left') {
      const leftPos = targetPosition.left - container.offsetWidth - offset;
      const topPos = {
        auto: targetPosition.top + target.offsetHeight / 2 - container.offsetHeight / 2,
        matchElement: targetPosition.top,
        matchStart: targetPosition.top,
        matchEnd: targetPosition.bottom - container.offsetHeight,
      }[size];
      container.style.left = `${leftPos}px`;
      container.style.top = `${topPos}px`;

      if (size === 'matchElement') {
        container.style.height = `${target.offsetHeight}px`;
      } else if (typeof size === 'function') {
        container.style.height = `${size(target.offsetHeight)}px`;
      }
      container.style.maxWidth = `${targetPosition.left - offset}px`;
    }

    if (display === 'right') {
      const leftPos = targetPosition.left + target.offsetWidth + offset;
      const topPos = {
        auto: targetPosition.top + target.offsetHeight / 2 - container.offsetHeight / 2,
        matchElement: targetPosition.top,
        matchStart: targetPosition.top,
        matchEnd: targetPosition.bottom - container.offsetHeight,
      }[size];
      container.style.left = size === 'auto' ? `${leftPos + vpLeft}px` : `${leftPos}px`;
      container.style.top = size === 'auto' ? `${topPos + vpTop}px` : `${topPos}px`;

      if (size === 'matchElement') {
        container.style.height = `${target.offsetHeight}px`;
      } else if (typeof size === 'function') {
        container.style.height = `${size(target.offsetHeight)}px`;
      }
      container.style.maxWidth = `${window.innerWidth - targetPosition.left - target.offsetWidth - offset}px`;
    }

    if (viewportOffset.current === null) {
      if (size === 'matchEnd') {
        viewportOffset.current = { left: 0, top: 0 };
      } else {
        const left = Number(container.style.left.replace('px', ''));
        const top = Number(container.style.top.replace('px', ''));
        viewportOffset.current = {
          left: left < 0 ? VIEWPORT_INITIAL_PADDING - left : 0,
          top: top < 0 ? VIEWPORT_INITIAL_PADDING - top : 0,
        };
      }
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
  /** A DOM element that the floating container will be displayed relative to. */
  element: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  /** The size of the container.
   * If `auto` the size will be determined by its contents.
   * If `matchElement` it will take the width or the height of the element depending
   * on the `displayAxis` prop.
   * It can also be a function that returns a number representing the width
   * or the height in pixels.
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 'matchElement', 'matchStart', 'matchEnd']),
    PropTypes.func,
  ]),
  /**
   * The distance between the element and the floating container.
   * It can be positive or negative.
   */
  offset: PropTypes.number,
  /**
   * If `auto` the component will try to determine where to display the container relative to the
   * element (top, bottom, left, right).
   * It can also be one of top, bottom, left, right, to force the floating container to always be
   * displayed in that position.
   */
  forceDisplay: PropTypes.oneOf(['auto', 'top', 'bottom', 'left', 'right']),
  /**
   * It can be `auto`, `vertical` or `horizontal`. It specifies the axis where
   * it will be displayed when `forceDisplay` is `auto`.
   */
  displayAxis: PropTypes.oneOf(['auto', 'vertical', 'horizontal']),
  /**
   * If there is space on both sides of the axis preffer this side.
   */
  preferredPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  /**
   * Configuration object that will be passed to the infinite scroller component.
   */
  infiniteScrollerConfig: PropTypes.instanceOf(Object),
};

export default forwardRef(FloatingContainer);
