import React from 'react';
import PropTypes from 'prop-types';

export const Cell = ({ col, row }) => {
  if (!row.values[col.id]) {
    return <td />;
  }

  if (col.type === 'string') {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <td
        className={row.values[col.id].styling?.className || null}
        {...row?.values[col.id]?.events}
      >
        {row.values[col.id]?.value}
      </td>
    );
  }
  const Component = col.type;
  return (
    <td
      className={row.values[col.id].styling?.className || null}
      {...row?.values[col.id]?.events}
    >
      <Component
        {...row.values[col.id].props}
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
