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
}) => (
  <li className="editable-list__item">
    {
      components.map((Component, index) => (
        /* eslint-disable-next-line */
        <div className={`editable-list__item-cell editable-list__item--size-${fields[index]?.size || 12}`}>
          <Component
            {...fields[index]?.props}
            label=""
            value={value[index]}
            /* eslint-disable-next-line */
            onChange={onChange.bind(null, index)}
            error={errors?.[index]}
            disabled={disabled || fields[index]?.props?.disabled}
            readOnly={readOnly || fields[index]?.props?.readOnly}
          />
        </div>
      ))
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
  fields: PropTypes.instanceOf(Array),
  errors: PropTypes.instanceOf(Array),
  components: PropTypes.instanceOf(Array),
  value: PropTypes.instanceOf(Array),
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default FieldsList;
