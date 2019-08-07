import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default class Collapsible extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    collapsed: PropTypes.bool,
    className: PropTypes.string,
  }

  state = {
    contentContainerStyle: {
      height: 'auto',
    },
  };

  constructor(props) {
    super(props);

    this.contentContainer = createRef();
    this.collapseWrapper = createRef();
    this.onEnter = this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
  }

  componentDidMount() {
    const { collapsed } = this.props;
    const height = (collapsed) ? 0 : this.getHeight();

    this.setHeight(height);

    window.addEventListener('resize', () => {
      if (!collapsed && this.contentContainer.current) {
        this.setHeight(this.getHeight());
      }
    });
  }

  onEnter() {
    this.setHeight(this.getHeight());
  }

  onExit() {
    this.setHeight(0);
  }

  setHeight(height) {
    this.setState({
      contentContainerStyle: {
        height: `${height}px`,
      },
    });
  }

  getHeight() {
    return this.contentContainer.current ? this.contentContainer.current.clientHeight : 0;
  }

  render() {
    const {
      className,
      collapsed,
      children,
    } = this.props;
    const {
      contentContainerStyle,
    } = this.state;
    return (
      <CSSTransition
        onEnter={this.onEnter}
        onExit={this.onExit}
        in={!collapsed}
        timeout={0}
        classNames="collapse"
      >
        <div
          className="collapse-wrapper"
          ref={this.collapseWrapper}
          style={contentContainerStyle}
        >
          <div
            className={className}
            ref={this.contentContainer}
          >
            { children }
          </div>
        </div>
      </CSSTransition>
    );
  }
}
