import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import TabContext from './TabContext';
import { usePrevious } from '../../../hooks';

function TabContent(props) {
  const {
    addTab,
    hideTab,
    updateTab,
    showTab,
    children,
    selectedPath,
    tabData,
    tabsId,
    tabExists,
    path,
    rendered,
    hideTabContent,
    tabs,
  } = props;

  useEffect(() => {
    const tempTabData = { ...tabData };

    if (!tabExists(path)) {
      addTab(tempTabData, path);
    }
  }, [tabData, path]);

  const prevTabData = usePrevious(tabData);
  useEffect(() => {
    if (
      tabExists(path) && tabData?.title
      && (prevTabData?.title !== tabData?.title || prevTabData.selected !== tabData.selected)
    ) {
      const tempTabData = { ...tabData };
      updateTab(tempTabData, path);
    }
  }, [tabData, path, prevTabData, tabs]);

  useEffect(() => {
    showTab(path);
    return () => hideTab(path);
  }, []);

  const shouldRender = useMemo(() => {
    if (!Object.keys(tabs).length) {
      return false;
    }

    if (hideTabContent || tabs[tabData.id].show === false) {
      return false;
    }

    if (!rendered) {
      return tabExists(path);
    }
    return selectedPath && selectedPath.indexOf(tabData.id) > -1;
  }, [hideTabContent, rendered, selectedPath, tabData, tabs]);

  const context = useMemo(() => ({ path, tabsId }), [path, tabsId]);

  return (
    (
      shouldRender
        ? (
          <div key={tabData.id} className="tyk-tab__content" style={{ display: selectedPath && selectedPath.indexOf(tabData.id) > -1 ? 'block' : 'none' }}>
            <TabContext.Provider value={context}>
              {children}
            </TabContext.Provider>
          </div>
        )
        : null
    )
  );
}

TabContent.propTypes = {
  addTab: PropTypes.func,
  updateTab: PropTypes.func,
  hideTab: PropTypes.func,
  showTab: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  path: PropTypes.instanceOf(Array),
  hideTabContent: PropTypes.bool,
  rendered: PropTypes.bool,
  selectedPath: PropTypes.instanceOf(Array),
  tabExists: PropTypes.func,
  tabsId: PropTypes.string,
  tabData: PropTypes.instanceOf(Object),
  tabs: PropTypes.instanceOf(Object),
};

export default TabContent;
