import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '../../components/Pagination';

const FieldPagination = (props) => {
  const { input, ...rest } = props;

  return (
    <Pagination
      {...input}
      {...rest}
      onChange={input.onChange}
      value={input.value ? input.value : 0}
    />
  );
};

FieldPagination.propTypes = {
  input: PropTypes.instanceOf(Object),
};

export default FieldPagination;
