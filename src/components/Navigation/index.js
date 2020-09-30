import React from 'react';
import PropTypes from 'prop-types';
import NavigationItem from './js/NavigationItem';

const Navigation = (props) => {
  const { children } = props;

  return <ul className="tyk-navigation">{children}</ul>;
};

Navigation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

Navigation.Item = NavigationItem;

export default Navigation;
