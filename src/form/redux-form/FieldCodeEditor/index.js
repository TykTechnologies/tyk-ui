import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import CodeEditor from '../../components/CodeEditor';

class FieldCodeEditor extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    const { input } = this.prop;
    const { onChange } = input;

    onChange(fromJS(value));
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
      <CodeEditor
        {...input}
        {...rest}
        error={this.getInputError()}
      />
    );
  }
}

FieldCodeEditor.propTypes = {
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldCodeEditor;
