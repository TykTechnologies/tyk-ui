import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FileInput from './FileInput';

export default class FieldFileInput extends Component {
  static propTypes = {
    input: PropTypes.instanceOf(Object),
    meta: PropTypes.instanceOf(Object),
    validationmessages: PropTypes.instanceOf(Object),
  };

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
      <FileInput
        {...input}
        {...rest}
        error={this.getInputError()}
      />
    );
  }
}
