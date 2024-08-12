import React from 'react';
import PropTypes from 'prop-types';

function ListItem(props) {
  const {
    className = '',
    children,
    selected,
  } = props;

  return (
    <li className={`${className} ${selected ? 'tyk-list__item--selected' : ''}`}>
      {children}
    </li>
  );
}

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  selected: PropTypes.bool,
};

export default ListItem;
