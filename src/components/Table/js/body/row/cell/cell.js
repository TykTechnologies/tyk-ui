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
    <td className={row.values[col.id].styling?.className || null}>
      <Component
        {...row.values[col.id].props}
        onClick={value => sendMessage(`cell.${col.id}.click`, {
          index, row, col, value,
        })}
        onChange={value => sendMessage(`cell.${col.id}.change`, {
          index, row, col, value,
        })}
      >
        {row.values[col.id].children ? row.values[col.id].children : null}
      </Component>
    </td>
  );
};

Cell.propTypes = {
  col: PropTypes.instanceOf(Object),
  row: PropTypes.instanceOf(Object),
  index: PropTypes.number,
};
