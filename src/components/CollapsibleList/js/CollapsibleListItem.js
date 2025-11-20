import React from 'react';
import PropTypes from 'prop-types';

function CollapsibleListItem(props) {
  const {
    className = '',
    children,
  } = props;

  return (
    <li className={`tyk-collapsible-list__item ${className}`}>
      {children}
    </li>
  );
}

CollapsibleListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
};

export default CollapsibleListItem;
