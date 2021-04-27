import React, { useState, useRef } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

const Tooltip = ({
  render, children, position = 'top', style, ...props
}) => {
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
    const internalStyle = {
      position: 'absolute',
      left: tooltipLeft,
      zIndex: '99999',
      maxWidth: '450px',
      overflowWrap: 'break-word',
    };

    if (position === 'bottom') {
      internalStyle.top = `${tooltipOffsetTop + height + 8}px`;
    }

    if (position === 'top') {
      internalStyle.bottom = `${window.innerHeight - top - window.scrollY + 8}px`;
    }

    return internalStyle;
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
      className="tyk-tooltip__wrapper"
      style={{
        display: 'inline-block',
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );

  return [source, renderToolTip()];
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  /** custom styles to apply on hovered element */
  style: PropTypes.instanceOf(Object),
  /** describes where the tooltip should be displayed in relation
   * whith the hovered element: top, bottom, left, right
   */
  position: PropTypes.string,
  /** content of the tooltip, can be a string or a React node element */
  render: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default Tooltip;
