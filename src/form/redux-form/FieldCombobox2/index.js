import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Combobox2 from '../../components/Combobox2';

const FieldCombobox2 = (props) => {
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
    <Combobox2
      {...props}
      onChange={handleOnChange}
      value={!input.value ? input.value : input.value.toJS()}
      error={getComboboxError()}
    />
  );
};

FieldCombobox2.propTypes = {
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldCombobox2;
