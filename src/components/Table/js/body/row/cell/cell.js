/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { tableContext } from '../../../../tableContext';

export const Cell = ({ col, row, index }) => {
  const { sendMessage } = useContext(tableContext);

  if (col.type === 'string') {
    return <td>{row.values[col.id]}</td>;
  }
  const Component = col.type;
  return (
    <td>
      <Component
        {...row.values[col.id]}
        onClick={() => sendMessage('cell.click', { index, row, col })}
        onChange={() => sendMessage('cell.change', { index, row, col })}
      >
        {row.values[col.id].noChild ? null : row.values[col.id].value}
      </Component>
    </td>
  );
};

Cell.propTypes = {
  col: PropTypes.instanceOf(Object),
  row: PropTypes.instanceOf(Object),
  index: PropTypes.number,
};
