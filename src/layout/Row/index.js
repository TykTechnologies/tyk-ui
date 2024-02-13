import React from 'react';
import PropTypes from 'prop-types';

/** Row component which must be always present as a wrapper for Columns */
function Row({
  className,
  nogutters,
  children,
  ...rest
}) {
  const classes = [
    'tyk-row',
    className,
    nogutters && 'no-gutters',
    nogutters && 'tyk-row--gutterless',
  ].filter(Boolean).join(' ');

  return (
    <div {...rest} className={classes}>
      { children }
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ]),
  /** Css classes that can be passed to the Row element */
  className: PropTypes.string,
  /** Removes all the spaces between column */
  nogutters: PropTypes.bool,
};

export default Row;
