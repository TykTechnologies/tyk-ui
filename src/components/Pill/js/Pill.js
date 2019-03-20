import React from 'react';
import PropTypes from 'prop-types';

const Pill = (props) => {
  const {
    children,
    theme,
  } = props;

  return (
    <div className={`tyk-pill tyk-pill--${theme}`}>
      {children}
    </div>
  );
};

Pill.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  theme: PropTypes.string,
};

Pill.defaultProps = {
  theme: 'default',
};

export default Pill;
