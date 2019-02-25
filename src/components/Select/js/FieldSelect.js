import React, { Component, Fragment } from 'react';
import { fromJS } from 'immutable';

import Select from './Select.js';

export default class FieldSelect extends Component {
  constructor(props) {
    super(props);

    this._handleEvent = this._handleEvent.bind(this);
  }

  _handleEvent(selectValue) {
    const { onChange, value } = this.props.input;

    onChange(fromJS(selectValue !== undefined ? selectValue : value));
  }

  getSelectError() {
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
      <Select
        {...input}
        {...rest}
        isfield="true"
        error={this.getSelectError()}
        onChange={this._handleEvent}
        onBlur={this._handleEvent}
        value={!input.value ? input.value : input.value.toJS()}
      />
    );
  }
}
