import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DateTimePicker from './DateTimePicker';

export default class FieldDateTimePicker extends Component {
  static propTypes = {
    meta: PropTypes.instanceOf(Object),
    input: PropTypes.instanceOf(Object),
    validationmessages: PropTypes.instanceOf(Object),
  };

  getInputError() {
    const {
      meta,
      validationmessages,
    } = this.props;
    const { touched, error } = meta;
    let message = null;

    if (touched && error && validationmessages[error]) {
      message = validationmessages[error];
    }

    return message;
  }

  render() {
    const { input, ...rest } = this.props;

    return (
      <DateTimePicker
        {...input}
        {...rest}
        isfield
        error={this.getInputError()}
      />
    );
  }
}
