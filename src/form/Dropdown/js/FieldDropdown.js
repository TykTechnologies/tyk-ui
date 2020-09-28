import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Dropdown from './Dropdown';

export default class FieldDropdown extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.element,
      PropTypes.string,
    ]),
    input: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    const { input } = this.props;
    const { onChange } = input;

    onChange(fromJS(value));
  }

  render() {
    const {
      children,
      input,
      ...rest
    } = this.props;

    return (
      <Dropdown
        {...rest}
        onSelect={this.handleOnChange}
        selectedItem={input.value}
      >
        {children}
      </Dropdown>
    );
  }
}
