import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import CodeEditor from '../../components/CodeEditor';

export default class FieldCodeEditor extends Component {
  static propTypes = {
    input: PropTypes.instanceOf(Object),
    meta: PropTypes.instanceOf(Object),
    validationmessages: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
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

  handleOnChange(value) {
    const { input } = this.prop;
    const { onChange } = input;

    onChange(fromJS(value));
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
