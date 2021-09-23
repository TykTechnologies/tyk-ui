import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

/**
 * The Message component is used to highlight important content to the users.
 *
 * If the content you are displaying needs immediate attention or is a feedback,
 * consider using `toast` instead
 */
function Message({
  children, theme, onClose, noMargin, className,
}) {
  function getCssClasses() {
    return [
      'tyk-message',
      `tyk-message--${theme || 'info'}`,
      noMargin && 'no-margin',
      className,
    ].filter(Boolean).join(' ');
  }

  const iconType = theme === 'success' ? 'check' : 'warning';

  return (
    <div className={getCssClasses()}>
      <Icon family="tykon" type={iconType} />
      <div className="tyk-message__content">
        { children }
      </div>
      {onClose && (
        <Icon family="tykon" type="x" onClick={onClose} />
      )}
    </div>
  );
}

Message.propTypes = {
  /** Set theme for message (eg. default, success, danger, etc) */
  theme: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  /** add a class to loader */
  className: PropTypes.string,
  /** Removes margins by adding `no-margin` class */
  noMargin: PropTypes.bool,
  /** Callback for clicking on the "x" */
  onClose: PropTypes.func,
};

export default Message;
