import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import DateTimePicker from './DateTimePicker.js';

export default class FieldDateTimePicker extends Component {
  constructor(props) {
    super(props);
  }

  getInputError() {
    const { touched, error, warning } = this.props.meta;
    let message = null;

    if(touched && error && this.props.validationmessages[error]) {
      message = this.props.validationmessages[error];
    }

    return message;
  }

  render() {
    const { input, ...rest } = this.props;

    return (
      <DateTimePicker
        { ...input }
        { ...rest }
        isfield="true"
        error={ this.getInputError() }
      />
    );
  }
}
