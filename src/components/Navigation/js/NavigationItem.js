import React from 'react';
import PropTypes from 'prop-types';

const NavigationItem = (props) => {
  const { children } = props;

  return (
    <li className="tyk-navigation-item">
      {children}
    </li>
  );
};

NavigationItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default NavigationItem;
