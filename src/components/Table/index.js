import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Message from '../Message';
import Pagination from '../../form/components/Pagination';
import Loader from '../Loader';
import InfiniteScroller from '../InfiniteScroller';
import { Header } from './js/header';
import { Body } from './js/body';
import { tableContext } from './tableContext';

/**
 * This is tyk's table component used to render a data in a tabular view.
 * See the example configuration object below to understand how to hydrate the table component
 */

function Table({
  value, onChange, noDataMessage, loading, infiniteScrolling,
}) {
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
      rows: state.rows.map((row) => ({ ...row, selected: data })),
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
    setState: (newState) => setState(newState),
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
    if (onChange) {
      onChange(onChangeMsg, state, api);
    }
    setOnChangeMsg('api');
  }, [state]);

  if (!state) {
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
      <div className={`scrollable ${state.styling?.className || ''}`} style={{ height: state.maxHeight ? state.maxHeight : 'auto', position: 'relative' }}>
        {
          loading && <Loader position="absolute" withbackground />
        }
        {
          infiniteScrolling && state.pagination
            ? (
              <InfiniteScroller
                refChild={itemsListRef}
                hasMore={state.pagination.totalPages > state.pagination.current}
                loadMore={(num) => sendMessage('pagination.change', num)}
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
            onChange={(num) => sendMessage('pagination.change', num)}
          />
        </div>
      )}
    </tableContext.Provider>
  );
}

Table.propTypes = {
  /** Configuration object used to render the component */
  value: PropTypes.shape({
    /** Configuration for table columns */
    columns: PropTypes.arrayOf(PropTypes.shape({
      /** Unique id of the column */
      id: PropTypes.string.isRequired,
      /** Name of the column */
      name: PropTypes.string,
      /** Type of  column, String by default */
      type: PropTypes.oneOfType([
        /** Just renders cell data of type strings */
        PropTypes.string,
        /** Render cell of elements (eg. Input / Button) */
        PropTypes.element,
        /** Render a custom function/component */
        PropTypes.func,
      ]),
      sortable: PropTypes.oneOfType([
        /** Make Column sortable */
        PropTypes.bool,
        /** Configure sorting behaviour */
        PropTypes.shape({
          /** Set default sorting direction ASC / DESC */
          default: PropTypes.string,
        }),
      ]),
    })),
    /** Configuration for table rows */
    rows: PropTypes.arrayOf(PropTypes.shape({})),
    /** Configuration to make table rows selectable */
    selectable: PropTypes.shape({}),
    /** Renders pagination for table if the object is missing / empty no pagination is rendered. */
    pagination: PropTypes.shape({}),
    /** Sets maximum height for table container. */
    maxHeight: PropTypes.string,
    /** Styling for the table container. */
    styling: PropTypes.shape({
      /** It's recommended to add styles to a class and pass the class in this object */
      className: PropTypes.string,
    }),
  }).isRequired,
  /** Callback executed with message and value when there are changes on table */
  onChange: PropTypes.func,
  /** Renders a <Message /> component with the given message when `config.rows` is empty */
  noDataMessage: PropTypes.string,
  /** Show placeholder loader */
  loading: PropTypes.bool,
  /** Adds infinite scroller on page and calls `onChange` with `pagination.change` message */
  infiniteScrolling: PropTypes.bool,
};

Table.defaultProps = {
  loading: false,
  infiniteScrolling: false,
  noDataMessage: 'No Data Available',
  onChange: null,
};

export default Table;
