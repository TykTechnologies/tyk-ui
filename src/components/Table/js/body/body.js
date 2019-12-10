import React, { useContext } from 'react';
import { tableContext } from '../../tableContext';
import { Row } from './row/row';


export const Body = () => {
  const { state } = useContext(tableContext);
  const { rows } = state;

  return (
    <tbody>
      {
        rows.map((row, i) => (
          <>
            <Row key={row.id} row={row} index={i} />
          </>
        ))
      }
    </tbody>
  );
};
