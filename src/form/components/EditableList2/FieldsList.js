import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';

const FieldsList = ({
  fields,
  disabled,
  readOnly,
  errors,
  components,
  onChange,
  onDelete,
  value,
  rowIndex,
}) => (
  <li className="editable-list__item">
    {
      components.map((Component, index) => {
        let field = fields[index];
        let tempField = typeof field === 'function' ? field(rowIndex, index) : field;
        return (
          /* eslint-disable-next-line */
          <div className={`editable-list__item-cell editable-list__item--size-${fields[index]?.size || 12}`}>
            <Component
              {...tempField?.props}
              label=""
              value={value[index]}
              /* eslint-disable-next-line */
              onChange={onChange.bind(null, index)}
              error={errors?.[index]}
              disabled={disabled || tempField?.props?.disabled}
              readOnly={readOnly || tempField?.props?.readOnly}
            />
          </div>
        );
      })
    }
    <div className={`editable-list__item-cell editable-list__item-action ${readOnly && 'editable-list__item-action--read-only'}`}>
      <Button
        iconOnly
        iconType="trash-alt"
        theme="primary-link"
        onClick={onDelete}
        disabled={readOnly || disabled}
      />
    </div>
  </li>
);

FieldsList.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  rowIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  fields: PropTypes.instanceOf(Array),
  errors: PropTypes.instanceOf(Array),
  components: PropTypes.instanceOf(Array),
  value: PropTypes.instanceOf(Array),
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default FieldsList;
