import React, { Component } from 'react';
import { fromJS } from 'immutable';

import Pagination from './Pagination';

export default class FieldPagination extends Component {
  render() {
    const { input, ...rest } = this.props;

    return (
      <Pagination
        { ...input }
        { ...rest }
        onChange={ input.onChange }
        value={ input.value ? input.value : 0 }
      >
      </Pagination>
    );
  }
}
