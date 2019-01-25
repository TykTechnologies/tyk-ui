import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Toggle from './Toggle.js';

export default class FieldToggle extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
  }

  _handleOnChange(value) {
    const { onChange } = this.props.input;

    onChange(fromJS(value));
  }

  render() {
    const { ...props } = this.props;

    return (
      <Toggle
        { ...props }
        onChange={ this._handleOnChange }
        value={ !props.input.value ? props.input.value : props.input.value.toJS() }
      >
        { this.props.children }
      </Toggle>
    );
  }
}
