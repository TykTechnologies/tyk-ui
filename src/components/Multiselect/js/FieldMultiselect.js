import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Multiselect from './Multiselect.js';

export default class FieldMultiselect extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
  }

  getMultiselectError() {
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
      <Multiselect
        { ...props }
        onChange={ this._handleOnChange }
        value={ !props.input.value ? props.input.value : props.input.value.toJS() }
        error={ this.getMultiselectError() }
      >
      </Multiselect>
    );
  }
}
