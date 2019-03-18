import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import DateRangePicker from './DateRangePicker';

const FieldDateRangePicker = (props) => {
  const { input, ...rest } = props;
  const { value, onChange } = input;

  const handleOnChange = (newValue) => {
    onChange(fromJS(newValue));
  };

  return (
    <DateRangePicker
      {...input}
      {...rest}
      value={!value ? value : value.toJS()}
      onChange={handleOnChange}
      isfield
    />
  );
};

FieldDateRangePicker.propTypes = {
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldDateRangePicker;
