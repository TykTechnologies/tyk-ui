import React from 'react';
import PropTypes from 'prop-types';

function ListHeader({
  fields,
  readOnly,
}) {
  return (
    <li className="editable-list__item editable-list__item-header">
      {
        fields.map((field) => (
          <div
            key={field?.props?.label || JSON.stringify(field)}
            className={`editable-list__item-cell editable-list__item--size-${field?.size || 12}`}
          >
            {field?.props?.label}
          </div>
        ))
      }
      <div className={`editable-list__item-cell editable-list__item-action ${readOnly && 'editable-list__item-action--read-only'}`}>Delete</div>
    </li>
  );
}

ListHeader.propTypes = {
  fields: PropTypes.instanceOf(Array),
  readOnly: PropTypes.bool,
};

export default ListHeader;
