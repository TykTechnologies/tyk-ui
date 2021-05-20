import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button';

const Header = ({
  label, addButtonName, onAddRow, disabled, readOnly,
}) => (
  <div className="editable-list__header">
    {label && <label>{label}</label>}
    {!disabled && !readOnly && (
      <Button
        theme="primary rounded-corners"
        onClick={onAddRow}
      >
        {addButtonName || 'Add'}
      </Button>
    )}
  </div>
);

Header.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onAddRow: PropTypes.func,
  addButtonName: PropTypes.string,
  label: PropTypes.string,
};

export default Header;
