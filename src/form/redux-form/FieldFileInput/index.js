import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FileInput from '../../components/FileInput';

class FieldFileInput extends Component {
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

FieldFileInput.propTypes = {
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldFileInput;
