import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import ListHeader from './ListHeader';
import FieldsList from './FieldsList';
import validateValues from './validate-values';
import withValidation from './with-validation';

const EditableList2 = ({
  addButtonName,
  fields, label,
  value = [],
  onChange = () => {},
}) => {
  const [internalErrors, setInteranlErrors] = useState(null);

  const updateRowValue = (rowIndex, fieldIndex, componentValue, isValid) => {
    const tempValueArr = !value ? [] : [...value];

    if (!value) {
      tempValueArr[rowIndex] = [...new Array(fields.length)];
      tempValueArr[rowIndex][fieldIndex] = componentValue;
    } else {
      const tempValue = [...tempValueArr[rowIndex]];
      tempValue[fieldIndex] = componentValue;
      tempValueArr[rowIndex] = tempValue;
    }

    if (internalErrors?.[rowIndex]?.[fieldIndex] && isValid) {
      const tempErrors = [...internalErrors];
      const tempFieldError = [...tempErrors[rowIndex]];
      tempFieldError[fieldIndex] = null;
      tempErrors[rowIndex] = tempFieldError;
      setInteranlErrors(tempErrors);
    }
    onChange(tempValueArr);
  };

  const hasErrors = errors => Boolean(errors?.flat()?.filter(Boolean).length);

  const Components = useMemo(
    () => fields.map(field => withValidation(field?.component || <></>)),
    [],
  );

  const onAddRow = () => {
    const errors = validateValues(fields, value);

    if (hasErrors(errors)) {
      setInteranlErrors(errors);
      return;
    }

    onChange([
      ...value && value,
      [...new Array(fields.length)],
    ]);
  };

  const deleteRow = (index) => {
    if (!value || value.length === 1) {
      return;
    }
    const tempValue = [...value];
    tempValue.splice(index, 1);
    onChange(tempValue);
  };

  return (
    <div className="editable-list__wrapper">
      <Header label={label} addButtonName={addButtonName} onAddRow={onAddRow} />
      <ul className="editable-list__list">
        {(value || [[]]).map((v, i) => (
          <FieldsList
            fields={fields}
            /* eslint-disable-next-line */
            onChange={updateRowValue.bind(null, i)}
            /* eslint-disable-next-line */
            onDelete={deleteRow.bind(null, i)}
            value={v}
            errors={internalErrors?.[i]}
            components={Components}
          />
        ))}
        <ListHeader fields={fields} />
      </ul>
    </div>
  );
};

EditableList2.propTypes = {
  addButtonName: PropTypes.string,
  label: PropTypes.string,
  fields: PropTypes.instanceOf(Array),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.instanceOf(Array)]),
};

export default EditableList2;
