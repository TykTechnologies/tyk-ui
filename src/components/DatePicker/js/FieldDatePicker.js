import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from './DatePicker';

const FormDatePicker = (props) => {
  const {
    input,
    meta,
    validationmessages,
    ...rest
  } = props;

  const getInputError = () => {
    const { touched, error } = meta;
    let message = null;

    if (touched && error && validationmessages[error]) {
      message = validationmessages[error];
    }

    return message;
  };

  return (
    <DatePicker
      {...input}
      {...rest}
      error={getInputError()}
    />
  );
};

FormDatePicker.propTypes = {
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FormDatePicker;
