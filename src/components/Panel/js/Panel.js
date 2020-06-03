import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PortalContext = createContext();

const Panel = (props) => {
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

  const handleToggle = () => {
    setCollapsedState(!collapsedState);

    if (onToggleCollapse) {
      onToggleCollapse(!collapsedState);
    }
  };

  return (
    <div className={getCssClasses()}>
      <PortalContext.Provider
        value={{
          collapsable,
          collapsed: collapsedState,
          onToggle: handleToggle,
          theme,
          collapsibleIconPosition,
        }}
      >
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
};

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

export default Panel;
export { PortalContext };
