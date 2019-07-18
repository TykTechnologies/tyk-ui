import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

export default class Tooltip extends Component {
  constructor(props) {
    super(props);
    const id = 'tyk-tooltip';
    this.domNode = document.querySelector(`#${id}`);
    if (!this.domNode) {
      this.domNode = document.createElement('div');
      this.domNode.setAttribute('id', id);
      document.body.appendChild(this.domNode);
    }
    this.state = {
      active: false,
    };

    this.sourceRef = React.createRef();
  }

  renderToolTip = () => {
    const { active } = this.state;
    const { render } = this.props;
    if (active) {
      const { top, left, width } = this.sourceRef.current.getBoundingClientRect();
      return (
        ReactDom.createPortal(
          <div
            style={{
              position: 'absolute',
              bottom: window.innerHeight - top - window.scrollY + 8,
              left: left + width / 2 + window.scrollX,
            }}
          >
            <div className="tyk-tooltip-content">
              {render}
            </div>
          </div>,
          this.domNode,
        )
      );
    }
    return null;
  }

  showToolTip = () => this.setState({ active: true });

  hideToolTip = () => this.setState({ active: false });

  render() {
    const { children } = this.props;
    const source = (
      <span
        onMouseEnter={this.showToolTip}
        onMouseLeave={this.hideToolTip}
        onFocus={this.showToolTip}
        onBlur={this.hideToolTip}
        ref={this.sourceRef}
        key="0"
      >
        {children}
      </span>
    );
    return [source, this.renderToolTip()];
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  render: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};
