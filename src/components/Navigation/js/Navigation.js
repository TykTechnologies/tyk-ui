import React from 'react';
import PropTypes from 'prop-types';

const Navigation = (props) => {
  const { children } = props;

  return (
    <ul className="tyk-navigation">
      {children}
    </ul>
  );
};

Navigation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default Navigation;
