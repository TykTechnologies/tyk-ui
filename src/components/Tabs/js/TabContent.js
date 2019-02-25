import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import TabContext from './TabContext';

export default class TabContent extends Component {
  componentDidMount() {
    const {
      addTab, tabExists, tabData, path, tabsId,
    } = this.props;

    const tempTabData = fromJS(tabData).toJS();
    if (!tabExists(path)) {
      addTab(tempTabData, path);
    }
  }

  shouldRender() {
    const {
      path, rendered, selectedPath, tabExists, tabData,
    } = this.props;

    if (!rendered) {
      return tabExists(path);
    }

    return selectedPath.indexOf(tabData.id) > -1;
  }

  render() {
    const {
      path, selectedPath, tabData, tabsId,
    } = this.props;

    return (
      this.shouldRender()
        ? (
          <div key={tabData.id} className="tyk-tab__content" style={{ display: selectedPath.indexOf(tabData.id) > -1 ? 'block' : 'none' }}>
            <TabContext.Provider
              value={{
                path,
                tabsId,
              }}
            >
              { this.props.children }
            </TabContext.Provider>
          </div>
        )
        : null
    );
  }
}
