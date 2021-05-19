import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button';

const Header = ({ label, addButtonName, onAddRow }) => (
  <div className="editable-list__header">
    {label && <label>{label}</label>}
    <Button
      theme="primary rounded-corners"
      onClick={onAddRow}
    >
      {addButtonName || 'Add'}
    </Button>
  </div>
);

Header.propTypes = {
  onAddRow: PropTypes.func,
  addButtonName: PropTypes.string,
  label: PropTypes.string,
};

export default Header;
