import React from 'react';
import PropTypes from 'prop-types';

function Loader({ className, position = 'relative', withbackground = false }) {
  const classes = [
    'loading',
    position,
    className,
  ].filter(Boolean).join(' ');

  const loader = (
    <div className={classes}>
      <div className="loading-bar" />
      <div className="loading-bar" />
      <div className="loading-bar" />
      <div className="loading-bar" />
    </div>
  );

  return withbackground
    ? <div className="tyk-loading__wrapper">{loader}</div>
    : loader;
}

Loader.propTypes = {
  /** add a class to loader */
  className: PropTypes.string,
  /** position of loader (absolute / relative) */
  position: PropTypes.string,
  /** defines weather loader should be renders with or without background */
  withbackground: PropTypes.bool,
};

export default Loader;
