import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import ListHeader from './ListHeader';
import FieldsList from './FieldsList';
import validateValues from './validate-values';
import withValidation from './with-validation';

/**
 * Editable list is a component, that lists rows of form elements (can have n elements on a row),
 * and stores the values of all the rows in an Array list
 */
const EditableList2 = ({
  addButtonName,
  disabled,
  readOnly,
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
      <Header
        disabled={disabled}
        readOnly={readOnly}
        label={label}
        addButtonName={addButtonName}
        onAddRow={onAddRow}
      />
      <ul className="editable-list__list">
        {(value || [[]]).map((v, i) => (
          <FieldsList
            disabled={disabled}
            readOnly={readOnly}
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
  /** Sets Editable list in edit mode.
   * If enabled all fields are disabled, the add button is hidden and delete button is disabled
   * */
  disabled: PropTypes.bool,
  /** Sets Editable list in read only mode.
   * If enabled all fields are displaying just the value,
   * the add button is hidden and delete button is disabled
   */
  readOnly: PropTypes.bool,
  /** Name of the Add button. By default has 'Add value' */
  addButtonName: PropTypes.string,
  /** Label of Editable list, is displayed above the list and inline with the Add button */
  label: PropTypes.string,
  /** Array of form elements that you want the list to have
   * Each field is an object points to the Form element component that you want to use,
   * the props you want to apply on it,
   * and the size (as in width, it's like columns system, between 1 and 12)
   * Example:
   * ...
   * fields={[
      {
        component: Input2,
        styles: {
          width: "200px",
        },
        size: 4,
        props: {
          name: 'input',
          label: 'Claim name',
          theme: 'default rounded-corners',
          placeholder: 'Enter claim name',
          validate: formikRequired('This field is required')
        }
      },
      {
        component: Combobox2,
        size: 8,
        props: comboboxProps
      }
    ]}
   */
  fields: PropTypes.instanceOf(Array),
  /** onChange function is called everytime the value of editable list changes */
  onChange: PropTypes.func,
  /** value of editable list, wich is an Array (List of row values)
   * of Arrays (List of column values,
   * each column will have the value format depending on the component type)
   */
  value: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.instanceOf(Array)]),
};

export default EditableList2;
