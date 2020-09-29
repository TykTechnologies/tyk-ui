import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import DatePicker from '../../components/DatePicker';

const FormDatePicker = (props) => {
  const {
    input,
    meta,
    validationmessages,
    ...rest
  } = props;

  const getDatePickerError = () => {
    const { touched, error } = meta;
    let message = null;

    if (touched && error && validationmessages[error]) {
      message = validationmessages[error];
    }

    return message;
  };

  const handleOnChange = (value) => {
    const { onChange } = input;

    onChange(fromJS(value));
  };

  return (
    <DatePicker
      {...rest}
      onChange={handleOnChange}
      value={!input.value ? input.value : input.value.toJS()}
      error={getDatePickerError()}
    />
  );
};

FormDatePicker.propTypes = {
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FormDatePicker;
