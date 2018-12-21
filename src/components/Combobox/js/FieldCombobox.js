import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Combobox from './Combobox.js';

export default class FieldCombobox extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
  }

  getComboboxError() {
    const { touched, error, warning } = this.props.meta;
    let message = null;

    if(touched && error && this.props.validationmessages[error]) {
      message = this.props.validationmessages[error];
    } else if(touched && warning) {
      message = 'warning';
    }

    return message;
  }

  _handleOnChange(value) {
    const { onChange } = this.props.input;

    onChange(fromJS(value));
  }

  render() {
    const { ...props } = this.props;

    return (
      <Combobox
        { ...props }
        onChange={ this._handleOnChange }
        value={ !props.input.value ? props.input.value : props.input.value.toJS() }
        error={ this.getComboboxError() }
      >
      </Combobox>
    );
  }
}
