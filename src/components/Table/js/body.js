import React, { useContext } from 'react';
import Message from '../../Message';
import { tableContext } from '../tableContext';
import { Row } from './row';


export const Body = () => {
  const { state } = useContext(tableContext);
  const { rows } = state;

  return (
    <tbody>
      {
        <Message theme="info">No Data Available</Message>
      }
      {
        // eslint-disable-next-line react/no-array-index-key
        rows.map((row, i) => <Row key={i} row={row} index={i} />)
      }
    </tbody>
  );
};
