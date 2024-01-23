import React from 'react';
import PropTypes from 'prop-types';
import List from '../../../components/List';
import useDropdowContext from './useDrodpownContext';

function DropdownItem({
  children,
  value,
}) {
  const { onChange, value: dropdownValue } = useDropdowContext();
  return (
    <List.Item
      {...value === dropdownValue && { className: 'tyk-list__item--selected' }}
    >
      <a
        {...onChange && { onClick: () => onChange(value) }}
      >
        { children }
      </a>
    </List.Item>
  );
}

DropdownItem.propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line
  value: PropTypes.any,
};

export default DropdownItem;
