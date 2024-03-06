import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Dropdown from '../../components/Dropdown';

class FieldDropdown extends Component {
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

FieldDropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  input: PropTypes.instanceOf(Object),
};

export default FieldDropdown;
