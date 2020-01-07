// HEADER
import React, { useContext, useState } from 'react';
import Icon from '../../../Icon';
import { tableContext } from '../../tableContext';

export const Header = () => {
  const [sortOrder, setSortOrder] = useState('ASC');
  const [selectAll, setSelectAll] = useState(false);
  const { state, sendMessage } = useContext(tableContext);
  const { columns, selectable } = state;

  const sendSortMessage = (column) => {
    sendMessage('sort', { column, sortOrder });
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  const generateHeader = () => columns.map(column => (
    <th
      key={column.id}
      onClick={column.sortable ? () => sendSortMessage(column) : null}
    >
      {column.name}
      {column.sortable && (
        <span className="header-sort">
          <Icon family="tykon" type={sortOrder === 'DESC' ? 'arrowdown' : 'arrowup'} />
        </span>
      )}
    </th>
  ));

  const generateSelectable = () => {
    if (!selectable) {
      return;
    }
    const Component = selectable.type;
    // eslint-disable-next-line consistent-return
    return (
      <th>
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
        {generateHeader()}
        {selectable && selectable.position === 'RIGHT' && generateSelectable()}
      </tr>
    </thead>
  );
};
