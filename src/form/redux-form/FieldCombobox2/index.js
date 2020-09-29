import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Combobox from '../../components/Combobox';

const FieldCombobox = (props) => {
  const { input, meta, validationmessages } = props;

  const getComboboxError = () => {
    const { touched, error, warning } = meta;
    let message = null;

    if (touched && error && validationmessages[error]) {
      message = validationmessages[error];
    } else if (touched && warning) {
      message = 'warning';
    }
    return message;
  };

  const handleOnChange = (value) => {
    const { onChange } = input;
    onChange(fromJS(value));
  };

  return (
    <Combobox
      {...props}
      onChange={handleOnChange}
      value={!input.value ? input.value : input.value.toJS()}
      error={getComboboxError()}
    />
  );
};

export default FieldCombobox;

FieldCombobox.propTypes = {
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};
