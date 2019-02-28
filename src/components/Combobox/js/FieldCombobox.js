import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Combobox from './Combobox';

export default class FieldCombobox extends Component {
  static propTypes = {
    meta: PropTypes.instanceOf(Object),
    input: PropTypes.instanceOf(Object),
    validationmessages: PropTypes.instanceOf(Object),
  }

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  getComboboxError() {
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
    const { input } = this.props;
    const { onChange } = input;

    onChange(fromJS(value));
  }

  render() {
    const { ...props } = this.props;

    return (
      <Combobox
        {...props}
        onChange={this.handleOnChange}
        value={!props.input.value ? props.input.value : props.input.value.toJS()}
        error={this.getComboboxError()}
      />
    );
  }
}
