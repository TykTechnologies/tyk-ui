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
const FloatingContainer = forwardRef(function FloatingContainer({
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
    const positionedVerticallyFitsInViewport = left + target.offsetWidth / 2 - container.offsetWidth / 2 > 0;
    const positionedHorizontallyFitsInViewport = top + target.offsetHeight / 2 - container.scrollHeight / 2 > 0;

    if (
      displayAxis === 'vertical'
      || (
        displayAxis === 'auto'
        && (hasTopSpace || hasBottomSpace)
        && positionedVerticallyFitsInViewport
      )
    ) {
      return getDisplayForVertical({
        preferredPosition, hasTopSpace, hasBottomSpace, topSpace, bottomSpace,
      });
    }

    if (displayAxis === 'horizontal') {
      return getDisplayForHorizontal({
        preferredPosition, hasLeftSpace, hasRightSpace, leftSpace, rightSpace,
      });
    }

    return getDisplayWhereItFits({
      preferredPosition,
      hasTopSpace,
      hasBottomSpace,
      hasLeftSpace,
      hasRightSpace,
      positionedHorizontallyFitsInViewport,
      positionedVerticallyFitsInViewport,
    });
  }

  function adjustPosition() {
    const display = forceDisplay !== 'auto' ? forceDisplay : determineDisplay();
    const target = element.current;
    const container = floatingContainerRef.current;

    if (!target || !container) return;

    const targetPosition = target.getBoundingClientRect();
    const { left: vpLeft, top: vpTop } = viewportOffset.current ?? { left: 0, top: 0 };

    if (display === 'top') {
      Object.assign(container.style, getStylesForTop({
        container, targetPosition, target, size, offset, vpLeft, vpTop,
      }));
    }

    if (display === 'bottom') {
      Object.assign(container.style, getStylesForBottom({
        container, targetPosition, target, size, offset, vpLeft, vpTop,
      }));
    }

    if (display === 'left') {
      Object.assign(container.style, getStylesForLeft({
        targetPosition, target, container, size, offset,
      }));
    }

    if (display === 'right') {
      Object.assign(container.style, getStylesForRight({
        targetPosition, target, container, size, offset, vpLeft, vpTop,
      }));
    }

    if (viewportOffset.current !== null) return;

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
});

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
  children: PropTypes.node,
  /**
   * Configuration object that will be passed to the infinite scroller component.
   */
  infiniteScrollerConfig: PropTypes.instanceOf(Object),
};

export default FloatingContainer;

function getDisplayForVertical({
  preferredPosition, hasTopSpace, hasBottomSpace, topSpace, bottomSpace,
}) {
  if (preferredPosition === 'top' && hasTopSpace) return 'top';
  if (preferredPosition === 'bottom' && hasBottomSpace) return 'bottom';
  return hasBottomSpace || bottomSpace > topSpace ? 'bottom' : 'top';
}

function getDisplayForHorizontal({
  preferredPosition, hasLeftSpace, hasRightSpace, leftSpace, rightSpace,
}) {
  if (preferredPosition === 'left' && hasLeftSpace) return 'left';
  if (preferredPosition === 'right' && hasRightSpace) return 'right';
  return hasRightSpace || rightSpace > leftSpace ? 'right' : 'left';
}

function getDisplayWhereItFits({
  preferredPosition, hasTopSpace, hasBottomSpace, hasLeftSpace, hasRightSpace,
  positionedHorizontallyFitsInViewport, positionedVerticallyFitsInViewport,
}) {
  if (hasTopSpace && positionedVerticallyFitsInViewport) return 'top';
  if (hasBottomSpace && positionedVerticallyFitsInViewport) return 'bottom';
  if (hasRightSpace && positionedHorizontallyFitsInViewport) return 'right';
  if (hasLeftSpace && positionedHorizontallyFitsInViewport) return 'left';
  return preferredPosition ?? 'bottom';
}

function getStylesForTop({
  container, targetPosition, target, size, offset, vpLeft, vpTop,
}) {
  const style = {};
  const leftPos = {
    auto: targetPosition.left + target.offsetWidth / 2 - container.offsetWidth / 2,
    matchElement: targetPosition.left,
    matchStart: targetPosition.left,
    matchEnd: targetPosition.right - container.offsetWidth,
  }[size];
  const topPos = targetPosition.top - container.offsetHeight - offset;
  style.left = `${leftPos + vpLeft}px`;
  style.top = `${topPos + vpTop}px`;

  if (size === 'matchElement') {
    style.width = `${target.offsetWidth}px`;
  } else if (size === 'matchEnd') {
    style.maxWidth = `${targetPosition.right - VIEWPORT_INITIAL_PADDING}px`;
  } else if (typeof size === 'function') {
    style.width = `${size(target.offsetWidth)}px`;
  }
  style.maxHeight = `${targetPosition.top - offset}px`;
  return style;
}

function getStylesForBottom({
  targetPosition, target, container, size, offset, vpLeft, vpTop,
}) {
  const style = {};
  const leftPos = {
    auto: targetPosition.left + target.offsetWidth / 2 - container.offsetWidth / 2,
    matchElement: targetPosition.left,
    matchStart: targetPosition.left,
    matchEnd: targetPosition.right - container.offsetWidth,
  }[size];
  const topPos = targetPosition.bottom + offset;
  style.left = `${leftPos + vpLeft}px`;
  style.top = `${topPos + vpTop}px`;

  if (size === 'matchElement') {
    style.width = `${target.offsetWidth}px`;
  } else if (size === 'matchEnd') {
    style.maxWidth = `${targetPosition.right - VIEWPORT_INITIAL_PADDING}px`;
  } else if (typeof size === 'function') {
    style.width = `${size(target.offsetWidth)}px`;
  }
  style.maxHeight = `${window.innerHeight - targetPosition.bottom - offset}px`;
  return style;
}

function getStylesForLeft({
  targetPosition, target, container, size, offset,
}) {
  const style = {};
  const leftPos = targetPosition.left - container.offsetWidth - offset;
  const topPos = {
    auto: targetPosition.top + target.offsetHeight / 2 - container.offsetHeight / 2,
    matchElement: targetPosition.top,
    matchStart: targetPosition.top,
    matchEnd: targetPosition.bottom - container.offsetHeight,
  }[size];
  style.left = `${leftPos}px`;
  style.top = `${topPos}px`;

  if (size === 'matchElement') {
    style.height = `${target.offsetHeight}px`;
  } else if (typeof size === 'function') {
    style.height = `${size(target.offsetHeight)}px`;
  }
  style.maxWidth = `${targetPosition.left - offset}px`;
  return style;
}

function getStylesForRight({
  targetPosition, target, container, size, offset, vpLeft, vpTop,
}) {
  const style = {};
  const leftPos = targetPosition.left + target.offsetWidth + offset;
  const topPos = {
    auto: targetPosition.top + target.offsetHeight / 2 - container.offsetHeight / 2,
    matchElement: targetPosition.top,
    matchStart: targetPosition.top,
    matchEnd: targetPosition.bottom - container.offsetHeight,
  }[size];
  style.left = size === 'auto' ? `${leftPos + vpLeft}px` : `${leftPos}px`;
  style.top = size === 'auto' ? `${topPos + vpTop}px` : `${topPos}px`;

  if (size === 'matchElement') {
    style.height = `${target.offsetHeight}px`;
  } else if (typeof size === 'function') {
    style.height = `${size(target.offsetHeight)}px`;
  }
  style.maxWidth = `${window.innerWidth - targetPosition.left - target.offsetWidth - offset}px`;
  return style;
}
