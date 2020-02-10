import React, { useContext, useState } from 'react';
import { HeaderCell } from './header-cell';
import { tableContext } from '../tableContext';

export const Header = () => {
  const [selectAll, setSelectAll] = useState(false);
  const { state, sendMessage } = useContext(tableContext);
  const { columns, selectable } = state;

  const generateHeaders = () => columns.map(column => (
    <HeaderCell
      key={column.id}
      column={column}
    />
  ));

  const generateSelectable = () => {
    if (!selectable) {
      return;
    }
    const Component = selectable.type;
    // eslint-disable-next-line consistent-return
    return (
      <th
        className={state.maxHeight ? 'fixed-header' : ''}
      >
        {selectable?.allowSelectAll ? (
          <div className={selectable?.style}>
            <Component
              {...selectable.values}
              onClick={() => {
                setSelectAll(!selectAll);
                sendMessage('header.selectAll.click', selectAll);
              }}
              onChange={(v) => {
                sendMessage('header.selectAll.change', v);
              }}
            >
              {selectable.values?.value}
            </Component>
          </div>
        ) : (
          selectable.name || 'Select'
        )}
      </th>
    );
  };

  return (
    <thead>
      <tr>
        {selectable && selectable.position === 'LEFT' && generateSelectable()}
        {generateHeaders()}
        {selectable && selectable.position === 'RIGHT' && generateSelectable()}
      </tr>
    </thead>
  );
};
