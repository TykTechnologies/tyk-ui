import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import PanelBody from './js/PanelBody';
import PanelFooter from './js/PanelFooter';
import PanelHeader from './js/PanelHeader';

import { PortalContext } from './panel-context';

function Panel(props) {
  const {
    children,
    className,
    collapsed,
    collapsable,
    theme,
    onToggleCollapse,
    collapsibleIconPosition = 'right',
  } = props;
  const [collapsedState, setCollapsedState] = useState(collapsed || false);

  useEffect(() => {
    if (collapsed !== collapsedState) {
      setCollapsedState(collapsed);
    }
  }, [collapsed]);

  const getCssClasses = () => {
    let cssClasses = ['tyk-panel'];
    const panelTheme = `tyk-panel--${theme || 'default'}`;
    const collapsbleIconPosition = `tyk-panel__icon-collapse--${collapsibleIconPosition}`;

    cssClasses.push(panelTheme);
    cssClasses.push(collapsbleIconPosition);

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    if (collapsedState) {
      cssClasses.push('tyk-panel--collapsed');
    }

    return cssClasses.join(' ');
  };

  const handleToggle = useCallback(() => {
    setCollapsedState(!collapsedState);

    if (onToggleCollapse) {
      onToggleCollapse(!collapsedState);
    }
  }, [collapsedState, onToggleCollapse]);

  const context = useMemo(() => ({
    collapsable,
    collapsed: collapsedState,
    onToggle: handleToggle,
    theme,
    collapsibleIconPosition,
  }), [collapsable, collapsedState, collapsibleIconPosition, theme, handleToggle]);

  return (
    <div className={getCssClasses()}>
      <PortalContext.Provider value={context}>
        {
          (typeof children === 'function')
            ? children({
              toggleCollapse: handleToggle,
            })
            : children
        }
      </PortalContext.Provider>
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  collapsable: PropTypes.bool,
  collapsibleIconPosition: PropTypes.string,
  collapsed: PropTypes.bool,
  theme: PropTypes.string,
  onToggleCollapse: PropTypes.func,
};

Panel.Body = PanelBody;
Panel.Footer = PanelFooter;
Panel.Header = PanelHeader;

export default Panel;
