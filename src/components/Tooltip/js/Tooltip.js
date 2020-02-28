import React, { useState, useRef } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

const Tooltip = ({ render, children, position = 'top' }) => {
  const [active, setActive] = useState(false);

  const id = 'tyk-tooltip';
  let domNode = document.querySelector(`#${id}`);
  if (!domNode) {
    domNode = document.createElement('div');
    domNode.setAttribute('id', id);
    document.body.appendChild(domNode);
  }

  const sourceRef = useRef(domNode);
  const tooltipRef = useRef(null);

  const getOffsetTop = (element) => {
    let offsetTop = 0;

    while (element) {
      offsetTop += element.offsetTop;
      // eslint-disable-next-line no-param-reassign
      element = element.offsetParent;
    }
    return offsetTop;
  };

  const getTooltipStyles = () => {
    const {
      top, left, width, height,
    } = sourceRef.current.getBoundingClientRect();
    const tooltipOffsetTop = getOffsetTop(sourceRef.current);
    const tooltipLeft = left + width / 2 + window.scrollX;
    const style = {
      position: 'absolute',
      left: tooltipLeft,
      zIndex: '99999'
    };

    if (position === 'bottom') {
      style.top = `${tooltipOffsetTop + height + 8}px`;
    }

    if (position === 'top') {
      style.bottom = `${window.innerHeight - top - window.scrollY + 8}px`;
    }

    return style;
  };

  const renderToolTip = () => {
    if (active) {
      return (
        ReactDom.createPortal(
          <div
            className={`tyk-tooltip__${position}`}
            style={getTooltipStyles()}
            ref={tooltipRef}
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
      style={{
        display: 'inline-block',
      }}
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
