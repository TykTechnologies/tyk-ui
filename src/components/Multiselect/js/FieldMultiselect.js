import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Multiselect from './Multiselect';

export default class FieldMultiselect extends Component {
  static propTypes = {
    input: PropTypes.instanceOf(Object),
    meta: PropTypes.instanceOf(Object),
    validationmessages: PropTypes.instanceOf(Object),
  }

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  getMultiselectError() {
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
      <Multiselect
        {...props}
        onChange={this.handleOnChange}
        value={!props.input.value ? props.input.value : props.input.value.toJS()}
        error={this.getMultiselectError()}
      />
    );
  }
}
