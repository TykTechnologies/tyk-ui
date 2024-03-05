import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { HeaderCell } from './header-cell';
import { tableContext } from '../tableContext';

export function Header({ allRowsSelected }) {
  const { state, sendMessage } = useContext(tableContext);
  const { columns, selectable } = state;

  const generateHeaders = () => columns.map((column) => (
    <HeaderCell
      key={column.id}
      column={column}
    />
  ));

  const generateSelectable = () => {
    const Component = selectable.type;
    return (
      <th
        className={state.maxHeight ? 'fixed-header' : ''}
      >
        {selectable?.allowSelectAll ? (
          <div className={selectable?.style}>
            <Component
              {...selectable.values}
              value={allRowsSelected}
              onChange={(v) => {
                const isCheckbox = v?.target?.tagName.toLowerCase() === 'input' && v?.target?.type.toLowerCase() === 'checkbox';
                sendMessage('header.selectAll.change', isCheckbox ? v.target.checked : Boolean(v));
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
        {selectable?.position === 'LEFT' && generateSelectable()}
        {generateHeaders()}
        {selectable?.position === 'RIGHT' && generateSelectable()}
      </tr>
    </thead>
  );
}

Header.propTypes = {
  allRowsSelected: PropTypes.bool,
};
