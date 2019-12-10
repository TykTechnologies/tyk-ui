import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../../Checkbox';
import { Cell } from './cell/cell';
import { tableContext } from '../../../tableContext';

export const Row = ({ row, index }) => {
  const { state, sendMessage } = useContext(tableContext);
  const { columns, selectable } = state;

  return (
    <tr>
      {selectable && selectable.position === 'LEFT' && (
        <td>
          <Checkbox
            defaultChecked={row.selected}
            onChange={v => sendMessage('row.selected', { index, selected: v })}
          />
        </td>
      )}
      {columns.map(col => (
        <>
          <Cell col={col} row={row} index={index} />
        </>
      ))}
      {selectable && selectable.position === 'RIGHT' && (
        <td>
          <Checkbox
            defaultChecked={row.selected}
            onChange={v => sendMessage('row.selected', { index, selected: v })}
          />
        </td>
      )}
    </tr>
  );
};

Row.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  row: PropTypes.object,
  index: PropTypes.number,
};
