import React, { Component } from 'react';
import Textarea from './Textarea';

export default class FieldTextarea extends Component {
  constructor(props) {
    super(props);
  }

  getInputError() {
    const { touched, error, warning } = this.props.meta;
    let message = null;

    if(touched && error && this.props.validationmessages[error]) {
      message = this.props.validationmessages[error];
    } else if(touched && warning) {
      message = 'warning';
    }

    return message;
  }

  render() {
    const { input, ...rest } = this.props;

    return (
      <Textarea
        { ...input }
        { ...rest }
        isfield="true"
        error={ this.getInputError() }
      />
    );
  }
}
