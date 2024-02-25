import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Input';

class FieldInput extends Component {
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
        isfield
        error={this.getInputError()}
      />
    );
  }
}

FieldInput.propTypes = {
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldInput;
