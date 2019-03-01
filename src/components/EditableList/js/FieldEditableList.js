import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import EditableList from './EditableList';

export default class FieldEditableList extends Component {
  static propTypes = {
    input: PropTypes.instanceOf(Object),
    meta: PropTypes.instanceOf(Object),
    validationmessages: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  getEditableListError() {
    const { meta, validationmessages } = this.props;
    const { touched, error } = meta;
    let message = null;

    if (touched && error && validationmessages[error]) {
      message = validationmessages[error];
    }

    return message;
  }

  handleOnChange(value) {
    const { input } = this.prop;
    const { onChange } = input;

    onChange(fromJS(value));
  }

  render() {
    const { ...props } = this.props;

    return (
      <EditableList
        {...props}
        onChange={this.handleOnChange}
        value={!props.input.value ? props.input.value : props.input.value.toJS()}
        error={this.getEditableListError()}
      />
    );
  }
}
