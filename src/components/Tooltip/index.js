import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import FloatingContainer from '../FloatingContainer';
import Icon from '../Icon';

function Tooltip({
  render,
  className,
  children,
  position = 'top',
  style,
  icon = false,
  closable,
  ...props
}) {
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);
  const activeEvents = closable
    ? {
      onClick: () => setIsActive(true),
    }
    : {
      onMouseEnter: () => setIsActive(true),
      onMouseLeave: () => setIsActive(false),
      onFocus: () => setIsActive(true),
      onBlur: () => setIsActive(false),
    };

  function handleDocumentClick(e) {
    if (tooltipRef.current?.contains?.(e.target)) return;
    setIsActive(false);
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, []);

  return (
    <div
      className="tyk-tooltip__wrapper"
      style={{ display: 'inline-block', ...style }}
      ref={wrapperRef}
      {...activeEvents}
      {...props}
    >
      {children}
      {isActive && (
        <FloatingContainer
          element={wrapperRef}
          forceDisplay={position}
          offset={20}
        >
          <div className={`tyk-tooltip ${className}`} ref={tooltipRef}>
            {icon && (
              icon === true ? (
                <Icon family="tykon" type="help" />
              ) : (
                icon
              )
            )}
            <div className="tyk-tooltip__content">
              {render}
            </div>
            {closable && (
              <Icon
                family="tykon"
                type="x"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsActive(false);
                }}
              />
            )}
          </div>
        </FloatingContainer>
      )}
    </div>
  );
}

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
  /** additional tooltip classes */
  className: PropTypes.string,
  /** if `true` displays the "question mark" icon;
   * optionally you can pass a different icon
  */
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.node,
  ]),
  /** if `true` the tooltip is activated on click and an "x" is displayed to close it;
   * if `false` the tooltip is activated on hover and it closes when no longer hovering
  */
  closable: PropTypes.bool,
};

export default Tooltip;
