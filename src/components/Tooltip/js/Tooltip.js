import React, { useState, useRef } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

const Tooltip = ({ render, children }) => {
  const [active, setActive] = useState(false);

  const id = 'tyk-tooltip';
  let domNode = document.querySelector(`#${id}`);
  if (!domNode) {
    domNode = document.createElement('div');
    domNode.setAttribute('id', id);
    document.body.appendChild(domNode);
  }

  const sourceRef = useRef(domNode);

  const renderToolTip = () => {
    if (active) {
      const { top, left, width } = sourceRef.current.getBoundingClientRect();
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
          domNode,
        )
      );
    }
    return null;
  };

  const source = (
    <span
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      ref={sourceRef}
      key="0"
    >
      {children}
    </span>
  );

  return [source, renderToolTip()];
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  render: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default Tooltip;
