import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Multiselect from '../../components/Multiselect';

class FieldMultiselect extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    const { input } = this.props;
    const { onChange } = input;

    onChange(fromJS(value));
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

FieldMultiselect.propTypes = {
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldMultiselect;
