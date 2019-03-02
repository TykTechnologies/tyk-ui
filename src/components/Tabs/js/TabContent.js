import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import TabContext from './TabContext';

const TabContent = (props) => {
  const {
    addTab,
    children,
    selectedPath,
    tabData,
    tabsId,
    tabExists,
    path,
    rendered,
  } = props;

  useEffect(() => {
    const tempTabData = fromJS(tabData).toJS();

    if (!tabExists(path)) {
      addTab(tempTabData, path);
    }
  });

  const shouldRender = () => {
    if (!rendered) {
      return tabExists(path);
    }

    return selectedPath.indexOf(tabData.id) > -1;
  };

  return (
    (
      shouldRender()
        ? (
          <div key={tabData.id} className="tyk-tab__content" style={{ display: selectedPath.indexOf(tabData.id) > -1 ? 'block' : 'none' }}>
            <TabContext.Provider
              value={{
                path,
                tabsId,
              }}
            >
              {children}
            </TabContext.Provider>
          </div>
        )
        : null
    )
  );
};

TabContent.propTypes = {
  addTab: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  path: PropTypes.instanceOf(Array),
  rendered: PropTypes.bool,
  selectedPath: PropTypes.instanceOf(Array),
  tabExists: PropTypes.func,
  tabsId: PropTypes.string,
  tabData: PropTypes.instanceOf(Object),
};

export default TabContent;
