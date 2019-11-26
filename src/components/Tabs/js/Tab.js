import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { TabsContext } from './Tabs';
import TabContext from './TabContext';
import TabContent from './TabContent';

const Tab = (props) => {
  const { id } = props;
  const tabsContext = useContext(TabsContext);
  const tabContext = useContext(TabContext);
  const {
    tabExists,
    selectedPath,
    addTab,
    rendered,
    hideTabContent,
  } = tabsContext;
  const {
    children,
  } = props;
  let path;

  if (tabContext && path) {
    if (tabContext.tabsId === tabsContext.id) {
      path = tabContext.path.concat([id]);
    } else {
      path = [id];
    }
  } else {
    path = [id];
  }

  return (
    <Fragment>
      <TabContent
        addTab={addTab}
        tabExists={tabExists}
        tabData={props}
        path={path}
        tabsId={tabsContext.id}
        selectedPath={selectedPath}
        rendered={rendered}
        hideTabContent={hideTabContent}
      >
        {children}
      </TabContent>
    </Fragment>
  );
};

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
