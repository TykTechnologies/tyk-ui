import React, {
  useRef, useState, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useEventListener, useComponentSize } from '../../hooks';

/**
 * Collapsible is a component that helps you to collapse/expand any type of content
 */
function Collapsible({
  className,
  collapsed,
  children,
  ...rest
}) {
  const contentContainer = useRef(null);
  const collapseWrapper = useRef(null);
  const refContainerSize = useComponentSize(contentContainer);
  const [contentContainerStyle, setContentContainerStyle] = useState({
    // eslint-disable-next-line
    height: (collapsed) ? 0 : 'auto',
  });

  const setHeight = (height) => {
    setContentContainerStyle({
      height: `${height}px`,
    });
  };

  const getHeight = () => (contentContainer.current ? contentContainer.current.clientHeight : 0);

  const onEnter = () => {
    setHeight(getHeight());
  };

  const onExit = () => {
    setHeight(0);
  };

  useEffect(() => {
    if (!collapsed
      && refContainerSize?.height
      && contentContainerStyle.height !== refContainerSize?.height
    ) {
      setHeight(refContainerSize.height);
    }
  }, [refContainerSize.height]);

  const onWindowResize = useCallback(() => {
    if (!collapsed && contentContainer.current) {
      setHeight(getHeight());
      collapseWrapper.current.style.height = `${getHeight()}px`;
    }
  }, [collapsed, contentContainer.current]);

  useEventListener('resize', onWindowResize, window);

  return (
    <CSSTransition
      onEnter={onEnter}
      onExit={onExit}
      in={!collapsed}
      timeout={0}
      classNames="collapse"
    >
      <div
        className="collapse-wrapper"
        ref={collapseWrapper}
        style={contentContainerStyle}
      >
        <div
          {...rest}
          className={className}
          ref={contentContainer}
        >
          { children }
        </div>
      </div>
    </CSSTransition>
  );
}

Collapsible.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  /** Describes if the content of Collapsible should be hidden or not */
  collapsed: PropTypes.bool,
  /** CSS classes that can be passed to the Collapsible element */
  className: PropTypes.string,
};

export default Collapsible;
