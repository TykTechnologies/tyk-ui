import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import SelectableList from '../../components/SelectableList';

class FieldSelectableList extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    const { input } = this.props;

    input.onChange(fromJS(value));
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <SelectableList
        {...props}
        onChange={this.handleOnChange}
        value={props.input.value ? props.input.value.toJS() : []}
      />
    );
  }
}

FieldSelectableList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
  ]),
  onChange: PropTypes.func,
  input: PropTypes.instanceOf(Object),
};

export default FieldSelectableList;
