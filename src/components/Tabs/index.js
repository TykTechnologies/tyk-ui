
import React, {
  useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import Tab from './js/Tab';

import Collapsible from '../Collapsible';
import Icon from '../Icon';
import { TabsContext } from './tabs-context';

const Tabs = (props) => {
  const {
    children,
    className,
    id,
    onTabChange,
    type,
    hideTabContent,
  } = props;
  const [tabs, setTabs] = useState({});
  const [selectedPath, setSelectedPath] = useState([]);
  const [rendered, setRendered] = useState(false);
  const [initialPath, setInitialPath] = useState(null);

  useEffect(() => {
    setSelectedPath(initialPath);
  }, [initialPath]);

  const updateTabsList = (tabsState, path, tabData) => {
    let tempTabsState = Object.assign({}, tabsState);
    const tempTabData = Object.assign({}, tabData);
    const tempPath = path.slice(0);

    while (tempPath.length > 1) {
      tempTabsState = tempTabsState[tempPath.shift()];

      if (!tempTabsState) {
        tempTabsState = {};
      }
    }

    tempTabData.tempPath = tempPath;
    tempTabsState[tempPath.shift()] = tempTabData;

    return tempTabsState;
  };

  const toggleTab = (tabsState, path) => {
    let tempTabsState = Object.assign({}, tabsState);
    const tempPath = path.slice(0);

    while (tempPath.length > 1) {
      tempTabsState = tempTabsState[tempPath.shift()];
    }

    const key = tempPath.shift();
    if (tempTabsState[key].collapsed === undefined) {
      tempTabsState[key].collapsed = true;
    } else {
      tempTabsState[key].collapsed = !tempTabsState[key].collapsed;
    }

    return tempTabsState;
  };

  const getCssClasses = () => {
    let cssClasses = ['tyk-tabs'];

    cssClasses.push(`tyk-tabs--${type || 'default'}`);

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  const setCurrentSelectedPath = (path, tabData) => {
    const tempPath = path.slice(0);
    let tempRendered = true;

    if (tabData.collapsible) {
      tempPath.push(Object.keys(tabData.tabs)[0]);
      tempRendered = false;
    }

    setTabs((prevTabs) => {
      let tempTabs = Object.assign({}, prevTabs);

      tempTabs = toggleTab(tempTabs, path);

      return tempTabs;
    });
    setSelectedPath(tempPath);
    setRendered(tempRendered);

    if (onTabChange) {
      onTabChange(tabData);
    }
  };

  const getTabCssClass = (tabId) => {
    const cssClasses = [];

    if (selectedPath && selectedPath.indexOf(tabId) > -1) {
      cssClasses.push('active');
    }

    return cssClasses.join(' ');
  };

  const genTabs = (currentTabs, path) => {
    if (!currentTabs) {
      return null;
    }

    return (
      <ul>
        {
          Object.keys(currentTabs).map((tabId, index) => {
            const tempPath = path ? path.concat([currentTabs[tabId].id]) : [currentTabs[tabId].id];
            const iconType = currentTabs[tabId].collapsed ? 'chevron-up' : 'chevron-down';

            if (currentTabs[tabId].show === false) {
              return null;
            }

            return (
              <li className={getTabCssClass(currentTabs[tabId].id)} key={currentTabs[tabId].id}>
                <button
                  type="button"
                  onClick={setCurrentSelectedPath.bind(null, tempPath, currentTabs[tabId])}
                  onKeyDown={setCurrentSelectedPath.bind(null, tempPath, currentTabs[tabId])}
                  tabIndex={index}
                >
                  { currentTabs[tabId].title }
                  {
                    currentTabs[tabId].collapsible
                      ? <Icon className="collapsable-arrow" type={iconType} />
                      : null
                  }
                </button>
                {
                  currentTabs[tabId].collapsible
                    ? (
                      <Collapsible
                        collapsed={currentTabs[tabId].collapsed}
                      >
                        {genTabs(currentTabs[tabId].tabs, tempPath)}
                      </Collapsible>
                    )
                    : genTabs(currentTabs[tabId].tabs, tempPath)
                }
              </li>
            );
          })
        }
      </ul>
    );
  };

  const addTab = (tabData, path) => {
    setTabs(prevTabs => updateTabsList({ ...prevTabs }, path, tabData));

    if (tabData.selected) {
      setInitialPath(path);
    }
  };

  const updateTab = (tabData, path) => {
    setTabs((prevTabs) => {
      const tempTabs = { ...prevTabs };
      tempTabs[tabData.id] = tabData;
      return tempTabs;
    });

    if (tabData.selected) {
      setCurrentSelectedPath(path, tabData);
    }
  };

  const hideTab = (path) => {
    setTabs((prevTabs) => {
      const tempTabs = { ...prevTabs };
      tempTabs[path].show = false;

      return tempTabs;
    });
  };

  const showTab = (path) => {
    setTabs((prevTabs) => {
      const tempTabs = { ...prevTabs };

      tempTabs[path].show = true;

      return tempTabs;
    });
  };

  const tabExists = (path) => {
    let tempTabs = { ...tabs };
    const tempPath = path.slice(0);
    while (tempPath.length > 1) {
      tempTabs = tempTabs[tempPath.shift()];
    }

    const key = tempPath.shift();

    return !!(tempTabs && tempTabs[key]);
  };

  return (
    <div className={getCssClasses()}>
      {genTabs(tabs)}
      <TabsContext.Provider
        value={{
          id,
          addTab,
          hideTab,
          updateTab,
          showTab,
          tabExists,
          selectedPath,
          rendered,
          hideTabContent,
          tabs,
        }}
      >
        {
          (typeof children === 'function')
            ? children({
              hideTab,
              showTab,
            })
            : children
        }
      </TabsContext.Provider>
    </div>
  );
};

Tabs.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  hideTabContent: PropTypes.bool,
  id: PropTypes.string,
  onTabChange: PropTypes.func,
  type: PropTypes.string,
};


Tabs.Tab = Tab;

export default Tabs;
