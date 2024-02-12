import React from 'react';
import PropTypes from 'prop-types';

function Column({
  children,
  align,
  className,
  offset,
  size,
  ...rest
}) {
  const classes = [
    'tyk-col',
    className,
    align && `tyk-col--align-${align}`,
    ...size.split(' ').map((cSize) => `tyk-col--${cSize}`),
    ...(offset ? offset.split(' ') : []).map((cOffset) => `tyk-col--offset-${cOffset}`),
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      { children }
    </div>
  );
}

Column.propTypes = {
  /**
  * This property describes how the column element will be aligned vertically
  * within a Row: bottom, center, top
  */
  align: PropTypes.string,
  /** Css classes that can be passed to the column element */
  className: PropTypes.string,
  /**
  * Specifies the size of the column within a Row (values must be between 1 - 12)
  */
  size: PropTypes.string.isRequired,
  /**
  * Specifies the left gap a column can have within a Row (values must be between 1 - 12)
  */
  offset: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
};

export default Column;
