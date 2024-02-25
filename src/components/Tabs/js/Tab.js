import React, {
  useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { TabsContext } from '../tabs-context';
import TabContext from './TabContext';
import TabContent from './TabContent';

function Tab(props) {
  const { id } = props;
  const tabsContext = useContext(TabsContext);
  const tabContext = useContext(TabContext);
  const {
    tabExists,
    selectedPath,
    addTab,
    updateTab,
    hideTab,
    showTab,
    rendered,
    hideTabContent,
    tabs,
  } = tabsContext;
  const {
    children,
  } = props;
  const [path, setPath] = useState('');

  useEffect(() => {
    let tempPath;
    if (tabContext && path) {
      if (tabContext.tabsId === tabsContext.id) {
        tempPath = tabContext.path.concat([id]);
      } else {
        tempPath = [id];
      }
    } else {
      tempPath = [id];
    }
    setPath(tempPath);
  }, [tabContext]);

  if (!path) {
    return null;
  }

  return (
    <TabContent
      addTab={addTab}
      updateTab={updateTab}
      hideTab={hideTab}
      showTab={showTab}
      tabExists={tabExists}
      tabData={props}
      path={path}
      tabsId={tabsContext.id}
      selectedPath={selectedPath}
      rendered={rendered}
      hideTabContent={hideTabContent}
      tabs={tabs}
    >
      {children}
    </TabContent>
  );
}

Tab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  id: PropTypes.string,
};

Tab.defaultProps = {};

export default Tab;
