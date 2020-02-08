import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Message from '../../Message';
import { Pagination } from '../../Pagination';
import Loader from '../../Loader';
import { Header } from './header';
import { Body } from './body';
import { tableContext } from '../tableContext';

const Table = ({ value, onChange, noDataMsg }) => {
  const [state, setState] = useState(null);
  const [onChangeMsg, setOnChangeMsg] = useState('api');

  const sortRows = (col, sortOrder) => {
    setState({
      ...state,
      sort: {
        order: sortOrder,
        col,
      },
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
        current: data + 1,
      },
    });
  };

  const api = {
    getState: () => state,
    setState: newState => setState(newState),
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
  };

  useEffect(() => setState(value), [value]);
  useEffect(() => {
    onChange(onChangeMsg, state, api);
    setOnChangeMsg('api');
  }, [state]);

  if (!state) {
    return <Loader />;
  }

  if (state.rows <= 0) {
    return <Message theme="info">{noDataMsg || 'No Data Available'}</Message>;
  }

  return (
    <tableContext.Provider value={{ state, sendMessage }}>
      <div className="scrollable" style={{ height: state.maxHeight ? state.maxHeight : 'auto' }}>
        <table className="tyk-table">
          <Header />
          <Body />
        </table>
      </div>
      {state.pagination && (
        <div className="new-table-pagination ">
          <Pagination
            value={state.pagination.current - 1}
            nrItemsOnPage={state.pagination.perPage - 1}
            totalNrOfPages={state.pagination.totalPages - 1}
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
  noDataMsg: PropTypes.string,
};

export default Table;
