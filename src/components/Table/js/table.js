import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '../../Pagination';
import Loader from '../../Loader';
import { Header } from './header/header';
import { Body } from './body/body';
import { tableContext } from '../tableContext';

const Table = ({ value, onChange }) => {
  const [state, setState] = useState(null);
  const [onChangeMsg, setOnChangeMsg] = useState('api');

  const sortRows = (row, sortOrder) => {
    const compareFn = (a, b) => {
      // eslint-disable-next-line no-nested-ternary
      const compare = (x, y) => (x === y ? 0 : x > y ? 1 : -1);
      const val1 = a.values[row];
      const val2 = b.values[row];
      const sorted = compare(val1, val2);
      return sortOrder === 'ASC' ? sorted : -sorted;
    };
    setState({
      ...state,
      rows: [...state.rows.sort(compareFn)],
    });
  };

  const selectAllRows = (data) => {
    setState({
      ...state,
      rows: state.rows.map(row => ({ ...row, selected: data })),
    });
  };

  const selectRow = (data) => {
    const { index, selected } = data;
    const selectedRow = state.rows[index];
    setState({
      ...state,
      rows: [
        ...state.rows.slice(0, index),
        { ...selectedRow, selected },
        ...state.rows.slice(index + 1),
      ],
    });
  };

  const setPagination = (data) => {
    setState({
      ...state,
      pagination: {
        ...state.pagination,
        current: data,
      },
    });
  };

  const api = {
    getState: () => state,
    setState: newState => setState(newState),
  };

  const changeCellValue = (data) => {
    console.log("Let's change a cell value", { data });
    const { index, col /* row */ } = data;
    const newValue = data.value;
    const selectedRow = state.rows[index];
    selectedRow.values[col.id].props.value = newValue;
    setState({
      ...state,
      rows: [
        ...state.rows.slice(0, index),
        {
          ...selectedRow,
          // values: {
          //   ...selectedRow.values,
          //   [col.id]: {
          //     ...row.values[col.id],
          //     value: newValue,
          //   },
          // },
        },
        ...state.rows.slice(index + 1),
      ],
      cellChange: {
        ...data,
      },
    });
  };

  const handleCellClick = (data) => {
    // eslint-disable-next-line no-shadow
    const { value, ...clicked } = data;
    setState({
      ...state,
      clicked,
    });
  };

  const sendMessage = (message, data) => {
    setOnChangeMsg(message);
    if (message === 'sort') {
      sortRows(data.column.id, data.sortOrder);
    }

    if (message === 'header.selectAll.click') {
      selectAllRows(data);
    }

    if (message === 'header.selectAll.change') {
      selectAllRows(data);
    }

    if (message === 'row.selected') {
      selectRow(data);
    }

    if (message === 'pagination.change') {
      setPagination(data);
    }

    if (message.includes('cell') && message.includes('change')) {
      changeCellValue(data);
    }

    if (message.includes('cell') && message.includes('click')) {
      handleCellClick(data);
    }
    // console.log('Triggering onChange from SendMessage Instead of UseEffect');
    // onChange(onChangeMsg, state, api);
  };

  useEffect(() => setState(value), [value]);
  useEffect(() => onChange(onChangeMsg, state, api), [state]);

  if (!state) {
    return <Loader />;
  }
  return (
    <tableContext.Provider value={{ state, sendMessage }}>
      <table className="tyk-table">
        <Header />
        <Body />
      </table>
      {state.pagination && (
        <div className="new-table-pagination">
          <Pagination
            value={state.pagination.current}
            nrItemsOnPage={state.pagination.perPage}
            totalNrOfPages={state.pagination.totalPages}
            onChange={num => sendMessage('pagination.change', num)}
          />
        </div>
      )}
    </tableContext.Provider>
  );
};

Table.propTypes = {
  value: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
};

export default Table;
