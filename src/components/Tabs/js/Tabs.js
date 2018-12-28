import React, { Component, createContext, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '../../Collapsible';
import { Icon } from '../../Icon';

export const TabsContext = createContext();

export default class Tabs extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  state = {
    tabs: {},
    selectedPath: [],
    rendered: false
  };

  updateTabsList(object, path, tabData) {
    let tempPath = path.slice(0);

    while(tempPath.length > 1) {
      object = object.tabs[tempPath.shift()];

      if(!object.tabs) {
        object.tabs = {};
      }
    }

    tabData.tempPath = tempPath;
    object.tabs[tempPath.shift()] = tabData;
  }

  tabExists(path) {
    const { state } = this;
    let tempState = state;
    let tempPath = path.slice(0);

    while(tempPath.length > 1) {
      tempState = tempState.tabs[tempPath.shift()];
    }

    let key = tempPath.shift();

    return tempState.tabs && tempState.tabs[key] ? true : false;
  }

  addTab(tabData, path) {
    this.setState((prevState) => {
      let tempState = prevState;

      this.updateTabsList(tempState, path, tabData);

      if(tabData.selected) {
        tempState.selectedPath = path;
      }

      return tempState;
    });
  };

  getTabCssClass(id) {
    const { selectedPath } = this.state;
    let cssClasses = [];

    if(selectedPath.indexOf(id) > -1) {
      cssClasses.push('active');
    }

    return cssClasses.join(' ');
  }

  genTabs(tabs, path) {
    return (
      <ul>
        {
          Object.keys(tabs).map((tabId) => {
            let tempPath = path ? path.concat([tabs[tabId].id]) : [tabs[tabId].id];
            let iconType = tabs[tabId].collapsed ? 'chevron-up' : 'chevron-down';

            return (
              <li className={ this.getTabCssClass(tabs[tabId].id) } key={ tabs[tabId].id }>
                <a onClick={ this.setSelectedPath.bind(this, tempPath, tabs[tabId]) }>{ tabs[tabId].title }
                  {
                    tabs[tabId].collapsible
                      ? <Icon className="collapsable-arrow" type={ iconType } />
                      : null
                  }
                </a>
                  {
                    tabs[tabId].collapsible
                      ? <Collapsible
                          collapsed={ tabs[tabId].collapsed }
                        >
                          {
                            tabs[tabId].tabs
                              ? this.genTabs(tabs[tabId].tabs, tempPath)
                              : null
                          }
                        </Collapsible>
                      : tabs[tabId].tabs
                          ? this.genTabs(tabs[tabId].tabs, tempPath)
                          : null
                  }
              </li>
            );
          })
        }
      </ul>
    );
  }

  toggleTab(tempState, path) {
    let tempPath = path.slice(0);

    while(tempPath.length > 1) {
      tempState = tempState.tabs[tempPath.shift()];
    }

    let key = tempPath.shift();
    if(tempState.tabs[key].collapsed === undefined) {
      tempState.tabs[key].collapsed = true;
    } else {
      tempState.tabs[key].collapsed = !tempState.tabs[key].collapsed;
    }
  }

  setSelectedPath(path, tabData) {
    const { onTabChange } = this.props;
    const { selectedPath } = this.state;
    let tempPath = path.slice(0);

    if(tabData.collapsible) {
      tempPath.push(Object.keys(tabData.tabs)[0]);

      this.setState((prevState) => {
        let tempState = prevState;

        this.toggleTab(tempState, path);

        return tempState;
      });
    } else {
      this.setState({
        selectedPath: tempPath,
        rendered: true
      });
    }

    if(onTabChange) {
      onTabChange(tabData);
    }
  }

  getCssClasses() {
    const { type } = this.props;
    const { className } = this.props;
    let cssClasses = ['tyk-tabs'];

    cssClasses.push('tyk-tabs--' + (type || 'default'));

    if(className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    const { selectedPath, tabs, rendered } = this.state;
    const { id } = this.props;

    return (
      <div className={ this.getCssClasses() }>
        { this.genTabs(tabs) }
        <TabsContext.Provider
          value={{
            id,
            addTab: this.addTab.bind(this),
            tabExists: this.tabExists.bind(this),
            selectedPath,
            rendered
          }}
        >
          { this.props.children }
        </TabsContext.Provider>
      </div>
    );
  }
}
