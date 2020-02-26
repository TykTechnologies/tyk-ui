import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Message from '../../Message';
import { Pagination } from '../../Pagination';
import Loader from '../../Loader';
import InfiniteScroller from '../../InfiniteScroller';
import { Header } from './header';
import { Body } from './body';
import { tableContext } from '../tableContext';

const Table = ({
  value, onChange, noDataMessage, loading, infiniteScrolling,
}) => {
  const [state, setState] = useState(null);
  const [onChangeMsg, setOnChangeMsg] = useState('api');
  const itemsListRef = useRef(null);
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

  if (!state || loading) {
    return <Loader position="absolute" />;
  }

  if (state.rows <= 0) {
    return <Message theme="info">{noDataMessage || 'No Data Available'}</Message>;
  }

  const getTable = () => (
    <table className="tyk-table" ref={itemsListRef}>
      <Header />
      <Body />
    </table>
  );

  return (
    <tableContext.Provider value={{ state, sendMessage }}>
      <div className={`scrollable ${state.styling?.className || ''}`} style={{ height: state.maxHeight ? state.maxHeight : 'auto' }}>
        {
          infiniteScrolling && state.pagination
            ? (
              <InfiniteScroller
                refChild={itemsListRef}
                hasMore={state.pagination.totalPages > state.pagination.current}
                loadMore={num => sendMessage('pagination.change', num)}
                pageNumber={state.pagination.current - 1}
                initialLoad={false}
              >
                { getTable() }
              </InfiniteScroller>
            )
            : getTable()
        }
      </div>
      {state.pagination && !infiniteScrolling && (
        <div className="new-table-pagination">
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
  noDataMessage: PropTypes.string,
  loading: PropTypes.bool,
  infiniteScrolling: PropTypes.bool,
};

export default Table;
