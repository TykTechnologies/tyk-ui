import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useRevealPanelService } from './js/RevealPanelService';

function RevealPanelHeaderLeft({ children }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

RevealPanelHeaderLeft.propTypes = {
  children: PropTypes.instanceOf({}),
};

function RevealPanelHeaderRight({ children }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

RevealPanelHeaderRight.propTypes = {
  children: PropTypes.instanceOf({}),
};

const mergeClasses = (...classNames) => classNames.map((it) => (it || '').trim()).filter(Boolean).join(' ');

const RevealPanel = forwardRef(({
  children,
  height,
  onHeightChange = null,
  onDragStart = null,
  onDragEnd = null,
  style = null,
  parentSelector = null,
  contentStyle,
  contentClassName,
  gutterClassName,
  wrapperClassName,
// eslint-disable-next-line consistent-return
}, ref) => {
  const panelRef = useRef(null);
  const gutterRef = useRef(null);
  const wrapperRef = useRef(null);

  const panelService = useRevealPanelService();

  useEffect(() => {
    if (!panelRef.current || !gutterRef.current || !wrapperRef.current) {
      return;
    }

    if (!panelService) {
      return;
    }

    panelService.setRefs(wrapperRef.current, panelRef.current, gutterRef.current);
    panelService.on('onHeightChange', onHeightChange);
    panelService.on('onDragStart', onDragStart);
    panelService.on('onDragEnd', onDragEnd);
    panelService.setHeight(height, 'initialize');

    // eslint-disable-next-line consistent-return
    return () => {
      panelService.unbindEvents();
    };
  }, []);

  useImperativeHandle(
    ref,
    () => {
      // bind this context
      const bind = (func) => func.bind(panelService);

      return {
        getHeight: bind(panelService.getHeight),
        setHeight: bind(panelService.setHeight),
        hide: bind(panelService.hide),
        show: bind(panelService.show),
        isHidden: bind(panelService.isHidden),
        deinit: bind(panelService.deinit),
        on: bind(panelService.on),
        off: bind(panelService.off),
      };
    },
    [],
  );

  let headerLeft = null;
  let headerRight = null;
  const contents = [];

  React.Children.forEach(children, (child) => {
    if (child && React.isValidElement(child)) {
      if (child.type === RevealPanelHeaderLeft) {
        headerLeft = child;
      } else if (child.type === RevealPanelHeaderRight) {
        headerRight = child;
      } else {
        contents.push(child);
      }
    }
  });

  const element = (
    <div className={mergeClasses('tyk-ui-reveal-wrapper', wrapperClassName || 'cem')} ref={wrapperRef} style={style}>
      <div className="tyk-ui-reveal-wrapper__hole" />
      <div ref={gutterRef} className={mergeClasses('tyk-ui-reveal-wrapper__gutter', gutterClassName)}>

        <div className="tyk-ui-reveal-wrapper__gutter__headerleft">{headerLeft}</div>
        <div className="tyk-ui-reveal-wrapper__gutter__logo"> </div>
        <div className="tyk-ui-reveal-wrapper__gutter__headerright">{headerRight}</div>

      </div>
      <div ref={panelRef} className={mergeClasses('tyk-ui-reveal-wrapper__panel', contentClassName)} style={contentStyle}>
        {contents}
      </div>
    </div>
  );

  if (parentSelector) {
    return createPortal(element, document.querySelector(parentSelector));
  }
});

RevealPanel.propTypes = {
  children: PropTypes.instanceOf({}),
  height: PropTypes.string,
  onHeightChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  parentSelector: PropTypes.string,
  style: PropTypes.instanceOf({}),
  contentStyle: PropTypes.instanceOf({}),
  contentClassName: PropTypes.string,
  gutterClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

RevealPanel.HeaderLeft = RevealPanelHeaderLeft;
RevealPanel.HeaderRight = RevealPanelHeaderRight;

export default RevealPanel;
