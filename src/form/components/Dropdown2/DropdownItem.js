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
      {...value === dropdownValue && { selected: true }}
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
  value: PropTypes.any,
};

export default DropdownItem;
