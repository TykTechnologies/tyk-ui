import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import PanelController from './js/RevealPanelController';

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

  const panelControllerRef = useRef(new PanelController());

  useEffect(() => {
    if (!panelRef.current || !gutterRef.current || !wrapperRef.current) {
      return;
    }

    const controller = panelControllerRef.current;
    if (!controller) {
      return;
    }

    controller.setRefs(wrapperRef.current, panelRef.current, gutterRef.current);
    controller.on('onHeightChange', onHeightChange);
    controller.on('onDragStart', onDragStart);
    controller.on('onDragEnd', onDragEnd);
    controller.setHeight(height, 'initialize');

    // eslint-disable-next-line consistent-return
    return () => {
      controller.unbindEvents();
    };
  }, []);

  useImperativeHandle(
    ref,
    () => {
      const ctl = panelControllerRef.current;

      return {
        getHeight: ctl.getHeight.bind(ctl),
        setHeight: ctl.setHeight.bind(ctl),
        hide: ctl.hide.bind(ctl),
        show: ctl.show.bind(ctl),
        isHidden: ctl.isHidden.bind(ctl),
        deinit: ctl.deinit.bind(ctl),
        on: ctl.on.bind(ctl),
        off: ctl.off.bind(ctl),
      };
    },
    [],
  );

  let headerLeft = null;
  let headerRight = null;
  let contents = [];

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
