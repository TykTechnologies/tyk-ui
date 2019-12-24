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
  } = props;
  const [collapsedState, setCollapsedState] = useState(collapsed || false);

  useEffect(() => {
    setCollapsedState(collapsed);
  }, [collapsed]);

  const getCssClasses = () => {
    let cssClasses = ['tyk-panel'];
    const panelTheme = `tyk-panel--${theme || 'default'}`;

    cssClasses.push(panelTheme);

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  const handleToggle = () => {
    console.log('aaa', collapsedState);
    setCollapsedState(!collapsedState);
  };

  return (
    <div className={getCssClasses()}>
      <PortalContext.Provider
        value={{
          collapsable,
          collapsed: collapsedState,
          onToggle: handleToggle,
          theme,
        }}
      >
        { children }
      </PortalContext.Provider>
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  collapsable: PropTypes.bool,
  collapsed: PropTypes.bool,
  theme: PropTypes.string,
};

export default Panel;
export { PortalContext };
