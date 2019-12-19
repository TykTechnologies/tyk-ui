import React, { useContext } from 'react';
import { tableContext } from '../../tableContext';
import { Row } from './row/row';


export const Body = () => {
  const { state } = useContext(tableContext);
  const { rows } = state;

  return (
    <tbody>
      {
        // eslint-disable-next-line react/no-array-index-key
        rows.map((row, i) => <Row key={i} row={row} index={i} />)
      }
    </tbody>
  );
};
