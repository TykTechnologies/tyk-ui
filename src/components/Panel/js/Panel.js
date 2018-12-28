import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const PortalContext = createContext();

export default class Panel extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ]),
    collapsable: PropTypes.bool,
    collapsed: PropTypes.bool,
    onExtend: PropTypes.func,
    onCollapsed: PropTypes.func,
    theme: PropTypes.string
  };

  state = {
    collapsable: this.props.collapsable || false,
    collapsed: this.props.collapsed || false
  };

  getCssClasses() {
    const { className, theme } = this.props;
    let cssClasses = ['tyk-panel'];
    let panelTheme = 'tyk-panel--' + (theme || 'default');

    cssClasses.push(panelTheme);

    if(className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  }

  handleToggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div className={ this.getCssClasses() }>
        <PortalContext.Provider
          value={{
            collapsable: this.props.collapsable,
            collapsed: this.state.collapsed,
            onToggle: this.handleToggle.bind(this),
            theme: this.props.theme
          }}
        >
          { this.props.children }
        </PortalContext.Provider>
      </div>
    );
  }
}

export { PortalContext };
