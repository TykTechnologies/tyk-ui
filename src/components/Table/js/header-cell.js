import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { tableContext } from '../tableContext';
import Icon from '../../Icon';

export const HeaderCell = ({ column }) => {
  const { sortable } = column;
  const [sortOrder, setSortOrder] = useState(sortable?.default || 'ASC');
  const { state, sendMessage } = useContext(tableContext);
  return (
    <th
      key={column.id}
      onClick={sortable ? () => {
        sendMessage('sort', { column, sortOrder });
        setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
      } : null}
      className={state.maxHeight ? 'fixed-header' : ''}
    >
      {column.name}
      {column.sortable && (
        <span className="header-sort">
          <Icon family="tykon" type={sortOrder === 'DESC' ? 'arrowdown' : 'arrowup'} />
        </span>
      )}
    </th>
  );
};

HeaderCell.propTypes = {
  column: PropTypes.instanceOf(Object),
};
