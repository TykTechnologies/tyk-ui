import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../components/Button';

const FieldsList = ({
  fields,
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
          />
        </div>
      ))
    }
    <div className="editable-list__item-cell editable-list__item-action">
      <Button iconOnly iconType="trash-alt" theme="primary-link" onClick={onDelete} />
    </div>
  </li>
);

FieldsList.propTypes = {
  fields: PropTypes.instanceOf(Array),
  errors: PropTypes.instanceOf(Array),
  components: PropTypes.instanceOf(Array),
  value: PropTypes.instanceOf(Array),
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default FieldsList;
