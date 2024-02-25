import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import EditableList from '../../components/EditableList';

class FieldEditableList extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    const { input } = this.props;
    const { onChange } = input;

    onChange(fromJS(value));
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

  render() {
    const { ...props } = this.props;

    return (
      <EditableList
        {...props}
        onChange={this.handleOnChange}
        value={!props.input.value ? null : props.input.value.toJS()}
        error={this.getEditableListError()}
      />
    );
  }
}

FieldEditableList.propTypes = {
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.instanceOf(Object),
  validationmessages: PropTypes.instanceOf(Object),
};

export default FieldEditableList;
