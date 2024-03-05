import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../../../form/components/Checkbox';
import { Cell } from './cell';
import { tableContext } from '../tableContext';

export function Row({ row, index }) {
  const { state, sendMessage } = useContext(tableContext);
  const { columns, selectable } = state;

  const SelectableCheckbox = useCallback(() => (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <td>
      <Checkbox
        value={row.selected}
        onChange={(v) => sendMessage('row.selected', { index, selected: v.target.checked })}
      />
    </td>
  ), [row.selected, index]);

  return (
    <tr
      onClick={row.events?.onClick}
      className={row.styling?.className}
    >
      {selectable && selectable.position === 'LEFT' && SelectableCheckbox()}
      {columns.map((col) => (
        <Cell key={col.id} col={col} row={row} index={index} />
      ))}
      {selectable && selectable.position === 'RIGHT' && SelectableCheckbox()}
    </tr>
  );
}

Row.propTypes = {
  row: PropTypes.instanceOf(Object),
  index: PropTypes.number,
};
