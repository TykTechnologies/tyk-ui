import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import CodeEditor from './CodeEditor.js';

export default class FieldCodeEditor extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
  }

  _handleOnChange(value) {
    const { onChange } = this.props.input;

    onChange(fromJS(value));
  }

  getInputError() {
    const { touched, error, warning } = this.props.meta;
    let message = null;

    if (touched && error && this.props.validationmessages[error]) {
      message = this.props.validationmessages[error];
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
