import React, { useContext } from 'react';
import { tableContext } from '../tableContext';
import { Row } from './row';

export function Body() {
  const { state } = useContext(tableContext);
  const { rows } = state;

  return (
    <tbody>
      {
        rows.map((row, i) => <Row key={i} row={row} index={i} />)
      }
    </tbody>
  );
}
