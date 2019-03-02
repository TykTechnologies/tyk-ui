import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

const PortalContext = createContext();

export default class Panel extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    className: PropTypes.string,
    collapsable: PropTypes.bool,
    collapsed: PropTypes.bool,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { collapsed } = this.props;

    this.state = {
      collapsed: collapsed || false,
    };
  }

  getCssClasses() {
    const { className, theme } = this.props;
    let cssClasses = ['tyk-panel'];
    const panelTheme = `tyk-panel--${theme || 'default'}`;

    cssClasses.push(panelTheme);

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  }

  handleToggle() {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed,
    });
  }

  render() {
    const {
      collapsable,
      children,
      theme,
    } = this.props;
    const {
      collapsed,
    } = this.state;

    return (
      <div className={this.getCssClasses()}>
        <PortalContext.Provider
          value={{
            collapsable,
            collapsed,
            onToggle: this.handleToggle.bind(this),
            theme,
          }}
        >
          { children }
        </PortalContext.Provider>
      </div>
    );
  }
}

export { PortalContext };
