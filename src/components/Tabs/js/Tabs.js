import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '../../Collapsible';
import { Icon } from '../../Icon';

export const TabsContext = createContext();

const Tabs = (props) => {
  const {
    children,
    className,
    id,
    onTabChange,
    type,
  } = props;
  const [tabs, setTabs] = useState({});
  const [selectedPath, setSelectedPath] = useState([]);
  const [rendered, setRendered] = useState(false);
  let initialPath = null;

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
    console.log(selectedPath);
    if (selectedPath.indexOf(tabId) > -1) {
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
    setTabs((prevTabs) => {
      let tempTabs = Object.assign({}, prevTabs);

      tempTabs = updateTabsList(tempTabs, path, tabData);

      return tempTabs;
    });

    if (tabData.selected) {
      initialPath = path;
    }
  };

  const tabExists = (path) => {
    let tempTabs = Object.assign(tabs);
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
          tabExists,
          selectedPath,
          rendered,
        }}
      >
        {children}
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
  id: PropTypes.string,
  onTabChange: PropTypes.func,
  type: PropTypes.string,
};

export default Tabs;
//
// export default class Tabs extends Component {
//   static propTypes = {
//     className: PropTypes.string,
//     children: PropTypes.oneOfType([
//       PropTypes.arrayOf(PropTypes.node),
//       PropTypes.node,
//       PropTypes.element,
//       PropTypes.string,
//     ]),
//     id: PropTypes.string,
//     onTabChange: PropTypes.func,
//     type: PropTypes.string,
//   };
//
//   static updateTabsList(state, path, tabData) {
//     let tempState = Object.assign({}, state);
//     const tempTabData = Object.assign({}, tabData);
//     const tempPath = path.slice(0);
//
//     while (tempPath.length > 1) {
//       tempState = tempState.tabs[tempPath.shift()];
//
//       if (!tempState.tabs) {
//         tempState.tabs = {};
//       }
//     }
//
//     tempTabData.tempPath = tempPath;
//     tempState.tabs[tempPath.shift()] = tempTabData;
//
//     return tempState;
//   }
//
//   static toggleTab(state, path) {
//     let tempState = Object.assign({}, state);
//     const tempPath = path.slice(0);
//
//     while (tempPath.length > 1) {
//       tempState = tempState.tabs[tempPath.shift()];
//     }
//
//     const key = tempPath.shift();
//     if (tempState.tabs[key].collapsed === undefined) {
//       tempState.tabs[key].collapsed = true;
//     } else {
//       tempState.tabs[key].collapsed = !tempState.tabs[key].collapsed;
//     }
//
//     return tempState;
//   }
//
//   state = {
//     tabs: {},
//     selectedPath: [],
//     rendered: false,
//   };
//
//   getCssClasses() {
//     const { type } = this.props;
//     const { className } = this.props;
//     let cssClasses = ['tyk-tabs'];
//
//     cssClasses.push(`tyk-tabs--${type || 'default'}`);
//
//     if (className) {
//       cssClasses = cssClasses.concat(className.split(' '));
//     }
//
//     return cssClasses.join(' ');
//   }
//
//   setSelectedPath(path, tabData) {
//     const { onTabChange } = this.props;
//     const tempPath = path.slice(0);
//
//     if (tabData.collapsible) {
//       tempPath.push(Object.keys(tabData.tabs)[0]);
//
//       this.setState((prevState) => {
//         let tempState = Object.assign({}, prevState);
//
//         tempState = Tabs.toggleTab(tempState, path);
//
//         return tempState;
//       });
//     } else {
//       this.setState({
//         selectedPath: tempPath,
//         rendered: true,
//       });
//     }
//
//     if (onTabChange) {
//       onTabChange(tabData);
//     }
//   }
//
//   getTabCssClass(id) {
//     const { selectedPath } = this.state;
//     const cssClasses = [];
//
//     if (selectedPath.indexOf(id) > -1) {
//       cssClasses.push('active');
//     }
//
//     return cssClasses.join(' ');
//   }
//
//   genTabs(tabs, path) {
//     if (!tabs) {
//       return null;
//     }
//
//     return (
//       <ul>
//         {
//           Object.keys(tabs).map((tabId, index) => {
//             const tempPath = path ? path.concat([tabs[tabId].id]) : [tabs[tabId].id];
//             const iconType = tabs[tabId].collapsed ? 'chevron-up' : 'chevron-down';
//
//             return (
//               <li className={this.getTabCssClass(tabs[tabId].id)} key={tabs[tabId].id}>
//                 <button
//                   type="button"
//                   onClick={this.setSelectedPath.bind(this, tempPath, tabs[tabId])}
//                   onKeyDown={this.setSelectedPath.bind(this, tempPath, tabs[tabId])}
//                   tabIndex={index}
//                 >
//                   { tabs[tabId].title }
//                   {
//                     tabs[tabId].collapsible
//                       ? <Icon className="collapsable-arrow" type={iconType} />
//                       : null
//                   }
//                 </button>
//                 {
//                   tabs[tabId].collapsible
//                     ? (
//                       <Collapsible
//                         collapsed={tabs[tabId].collapsed}
//                       >
//                         {this.genTabs(tabs[tabId].tabs, tempPath)}
//                       </Collapsible>
//                     )
//                     : this.genTabs(tabs[tabId].tabs, tempPath)
//                 }
//               </li>
//             );
//           })
//         }
//       </ul>
//     );
//   }
//
//   addTab(tabData, path) {
//     this.setState((prevState) => {
//       let tempState = Object.assign({}, prevState);
//
//       tempState = Tabs.updateTabsList(tempState, path, tabData);
//
//       if (tabData.selected) {
//         tempState.selectedPath = path;
//       }
//
//       return tempState;
//     });
//   }
//
//   tabExists(path) {
//     const { state } = this;
//     let tempState = state;
//     const tempPath = path.slice(0);
//
//     while (tempPath.length > 1) {
//       tempState = tempState.tabs[tempPath.shift()];
//     }
//
//     const key = tempPath.shift();
//
//     return !!(tempState.tabs && tempState.tabs[key]);
//   }
//
//   render() {
//     const { selectedPath, tabs, rendered } = this.state;
//     const { children, id } = this.props;
//
//     return (
//       <div className={this.getCssClasses()}>
//         { this.genTabs(tabs) }
//         <TabsContext.Provider
//           value={{
//             id,
//             addTab: this.addTab.bind(this),
//             tabExists: this.tabExists.bind(this),
//             selectedPath,
//             rendered,
//           }}
//         >
//           {children}
//         </TabsContext.Provider>
//       </div>
//     );
//   }
// }
