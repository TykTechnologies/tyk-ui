import React from 'react';
import PropTypes from 'prop-types';

function Loader({
  className, type = 'circular', size = 'big', position = 'relative', withbackground = false, isLoaded = false,
}) {
  const isKeywordSize = ['big', 'small'].includes(size);
  const classes = [
    'loading',
    `loader-type-${type}`,
    isKeywordSize && `loader-size-${size}`,
    position,
    className,
    isLoaded && 'is-loaded',
  ].filter(Boolean).join(' ');

  const loader = <div className={classes} {...(isKeywordSize ? {} : { style: { '--loader-size': size } })} />;

  return withbackground
    ? <div className="tyk-loading__wrapper">{loader}</div>
    : loader;
}

Loader.propTypes = {
  /** Add a class to loader */
  className: PropTypes.string,
  /** The type of the loader (linear || circular || brand) */
  type: PropTypes.string,
  /** The size of the loader (small || big). Only applicable to the circular loader. */
  size: PropTypes.string,
  /** Position of the loader (absolute || relative) */
  position: PropTypes.string,
  /** Defines whether loader should be rendered with or without background */
  withbackground: PropTypes.bool,
  /** Only applicable to the linear loader. Stops the animation and fills the entire bar. */
  isLoaded: PropTypes.bool,
};

export default Loader;
