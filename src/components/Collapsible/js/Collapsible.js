import React, {
  useRef, useState, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useEventListener, useComponentSize } from '../../../common/js/hooks';

const Collapsible = (props) => {
  const {
    className,
    collapsed,
    children,
  } = props;

  const contentContainer = useRef(null);
  const collapseWrapper = useRef(null);
  const [contentContainerStyle, setContentContainerStyle] = useState({
    height: 'auto',
  });

  const refContainerSize = useComponentSize(contentContainer);

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
    const height = (collapsed) ? 0 : getHeight();

    setHeight(height);
  }, []);

  useEffect(() => {
    if (!collapsed) {
      setHeight(refContainerSize.height);
    }
  }, [refContainerSize.height]);

  const onWindowResize = useCallback(() => {
    if (!collapsed && contentContainer.current) {
      setHeight(getHeight());
    }
  }, [collapsed, contentContainer.current]);

  useEventListener('resize', onWindowResize);

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
          className={className}
          ref={contentContainer}
        >
          { children }
        </div>
      </div>
    </CSSTransition>
  );
};

Collapsible.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  collapsed: PropTypes.bool,
  className: PropTypes.string,
};

export default Collapsible;
