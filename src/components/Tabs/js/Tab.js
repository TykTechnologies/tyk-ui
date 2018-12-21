import React, { Component, createContext, Fragment } from 'react';
import { fromJS } from 'immutable';
import { TabsContext } from './Tabs';

const TabContext = createContext();

class TabContent extends Component {
  componentDidMount() {
    const { addTab, tabExists, tabData, path, tabsId } = this.props;

    let tempTabData = fromJS(tabData).toJS();
    if(!tabExists(path)) {
      addTab(tempTabData, path);
    }
  }

  shouldRender() {
    const { path, rendered, selectedPath, tabExists, tabData } = this.props;

    if(!rendered) {
      return tabExists(path);
    }

    return selectedPath.indexOf(tabData.id) > -1;
  }

  render() {
    const { path, selectedPath, tabData, tabsId } = this.props;

    return (
      this.shouldRender()
        ? <div key={ tabData.id } className="tyk-tab__content" style={{ display: selectedPath.indexOf(tabData.id) > -1 ? 'block' : 'none' }}>
            <TabContext.Provider
              value={{
                path,
                tabsId
              }}
            >
              { this.props.children }
            </TabContext.Provider>
          </div>
        : null
    );
  }
}

export default class Tab extends Component {
  render() {
    const { id } = this.props;

    return (
      <Fragment>
        <TabsContext.Consumer>
        {
          (tabsContext) => {
            return (
              <TabContext.Consumer>
                {
                  (tabContext) => {
                    let path;

                    if(tabContext && tabContext.path) {
                      if(tabContext.tabsId === tabsContext.id ) {
                        path = tabContext.path.concat([ id ]);
                      } else {
                        path = [ id ];
                      }
                    } else {
                      path = [ id ];
                    }

                    return (
                      <TabContent
                        addTab={ tabsContext.addTab }
                        tabExists={ tabsContext.tabExists }
                        tabData={ this.props }
                        path={ path }
                        tabsId={ tabsContext.id }
                        selectedPath={ tabsContext.selectedPath }
                        rendered={ tabsContext.rendered }
                      >
                        { this.props.children }
                      </TabContent>
                    );
                  }
                }
              </TabContext.Consumer>
            );
          }
        }
        </TabsContext.Consumer>
      </Fragment>
    );
  }
}
