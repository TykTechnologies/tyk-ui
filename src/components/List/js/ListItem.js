import React from 'react';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  const {
    className,
    children,
  } = props;

  return (
    <li className={className}>
      {children}
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
};

ListItem.defaultProps = {
  className: '',
};

export default ListItem;
