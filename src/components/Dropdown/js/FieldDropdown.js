import React, { Component } from 'react';
import { fromJS } from 'immutable';

import Dropdown from './Dropdown';

export default class FieldDropdown extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
  }

  _handleOnChange(value) {
    const { onChange } = this.props.input;

    onChange(fromJS(value));
  }

  render() {
    const { input, ...rest } = this.props;

    return (
      <Dropdown
        { ...rest }
        onSelect={ this._handleOnChange }
        selectedItem={ input.value }
      >
        { this.props.children }
      </Dropdown>
    );
  }
}
