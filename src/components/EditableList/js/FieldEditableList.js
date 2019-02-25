import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import EditableList from './EditableList.js';

export default class FieldEditableList extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
  }

  getEditableListError() {
    const { touched, error, warning } = this.props.meta;
    const { input } = this.props;
    let message = null;

    if (touched && error && this.props.validationmessages[error]) {
      message = this.props.validationmessages[error];
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
      <EditableList
        {...props}
        onChange={this._handleOnChange}
        value={!props.input.value ? props.input.value : props.input.value.toJS()}
        error={this.getEditableListError()}
      />
    );
  }
}
