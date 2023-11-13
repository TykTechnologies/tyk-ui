import React from 'react';
import PropTypes from 'prop-types';

function NavigationItem({ children }) {
  return (
    <li className="tyk-navigation-item">
      {children}
    </li>
  );
}

NavigationItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

export default NavigationItem;
