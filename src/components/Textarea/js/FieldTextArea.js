import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextArea from './Textarea';

export default class FieldTextarea extends Component {
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
      <TextArea
        {...input}
        {...rest}
        isfield
        error={this.getInputError()}
      />
    );
  }
}
