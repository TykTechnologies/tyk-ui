import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../Checkbox';
import { Cell } from './cell';
import { tableContext } from '../tableContext';

export const Row = ({ row, index }) => {
  const { state, sendMessage } = useContext(tableContext);
  const { columns, selectable } = state;

  const SelectableCheckbox = () => (
    <td className="selectable">
      <Checkbox
        defaultChecked={row.selected}
        onChange={v => sendMessage('row.selected', { index, selected: v })}
      />
    </td>
  );

  return (
    <tr
      className={row.styling?.className}
      {...row?.events}
    >
      {selectable && selectable.position === 'LEFT' && SelectableCheckbox()}
      {columns.map(col => (
        <Cell key={col.id} col={col} row={row} index={index} />
      ))}
      {selectable && selectable.position === 'RIGHT' && SelectableCheckbox()}
    </tr>
  );
};

Row.propTypes = {
  row: PropTypes.instanceOf(Object),
  index: PropTypes.number,
};
