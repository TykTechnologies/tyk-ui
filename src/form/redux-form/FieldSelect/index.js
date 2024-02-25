import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Select from '../../components/Select';

class FieldSelect extends Component {
  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);
  }

  handleEvent(selectValue) {
    const { input } = this.props;
    const { onChange, value } = input;

    onChange(fromJS(selectValue !== undefined ? selectValue : value));
  }

  getSelectError() {
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
    const { input, ...rest } = this.props;

    return (
      <Select
        {...input}
        {...rest}
        isfield
        error={this.getSelectError()}
        onChange={this.handleEvent}
        onBlur={this.handleEvent}
        value={!input.value ? input.value : input.value.toJS()}
      />
    );
  }
}

FieldSelect.propTypes = {
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldSelect;
