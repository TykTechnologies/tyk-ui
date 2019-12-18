import React, { useContext } from 'react';
import { tableContext } from '../../tableContext';
import { Row } from './row/row';


export const Body = () => {
  const { state } = useContext(tableContext);
  const { rows } = state;

  return (
    <tbody>
      {
        rows.map((row, i) => {
          console.log({ row });
          // eslint-disable-next-line react/no-array-index-key
          return <Row key={i} row={row} index={i} />;
        })
      }
    </tbody>
  );
};
