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

  constructor(props) {
    super(props);

    this.contentContainer = createRef();
    this.collapseWrapper = createRef();
    this.onEnter = this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
  }

  componentDidMount() {
    const height = (this.props.collapsed) ? 0 : this.getHeight();

    this.setHeight(height);

    window.addEventListener('resize', () => {
      this.setHeight(this.getHeight());
    });
  }

  state = {
    contentContainerStyle: {
      height: 'auto',
    },
  };

  getHeight() {
    return this.contentContainer.current.clientHeight;
  }

  setHeight(height) {
    this.setState({
      contentContainerStyle: {
        height: `${height}px`,
      },
    });
  }

  onEnter() {
    this.setHeight(this.getHeight());
  }

  onExit() {
    this.setHeight(0);
  }

  render() {
    return (
      <CSSTransition
        onEnter={this.onEnter}
        onExit={this.onExit}
        in={!this.props.collapsed}
        timeout={0}
        classNames="collapse"
      >
        <div
          className="collapse-wrapper"
          ref={this.collapseWrapper}
          style={this.state.contentContainerStyle}
        >
          <div
            className={this.props.className}
            ref={this.contentContainer}
          >
            { this.props.children }
          </div>
        </div>
      </CSSTransition>
    );
  }
}
