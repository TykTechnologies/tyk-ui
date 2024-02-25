import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Combobox from '../../components/Combobox';

class FieldCombobox extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    const { input } = this.props;
    const { onChange } = input;

    onChange(fromJS(value));
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

FieldCombobox.propTypes = {
  meta: PropTypes.instanceOf(Object),
  input: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldCombobox;
