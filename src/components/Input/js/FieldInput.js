import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

export default class FieldInput extends Component {
  static propTypes = {
    meta: PropTypes.instanceOf(Object),
    input: PropTypes.instanceOf(Object),
    validationmessages: PropTypes.instanceOf(Object),
  }

  getInputError() {
    const { meta, validationmessages } = this.props;
    const { touched, error, warning } = meta;
    let message = null;

    if (touched && error && validationmessages[error]) {
      message = validationmessages[error];
    } else if (touched && warning) {
      message = 'warning';
    }

    return message;
  }

  render() {
    const { input, ...rest } = this.props;

    return (
      <Input
        {...input}
        {...rest}
        isfield="true"
        error={this.getInputError()}
      />
    );
  }
}
