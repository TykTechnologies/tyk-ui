import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../../Input';
import Icon from '../../../../components/Icon';
import Message from '../../../../components/Message';
import InfiniteScroller from '../../../../components/InfiniteScroller';
import MultiselectItem from './MultiselectItem';

function MultiselectPanel({
  inputPlaceholder,
  noItemsMessage,
  items,
  onCustomSearch,
  onChange,
  customSearch,
  panelType,
  serverLoad,
  itemsPageNumber,
  itemsNrPages,
  loadMoreItems,
}) {
  const [searchValue, setSearchValue] = useState('');
  const itemIndex = useRef(0);
  const itemsListRef = useRef();

  function getItemIndex() {
    itemIndex.current += 1;

    return itemIndex.current;
  }

  function getItemsList() {
    return (
      serverLoad
        ? (
          <InfiniteScroller
            refChild={itemsListRef}
            hasMore={itemsNrPages > itemsPageNumber}
            loadMore={loadMoreItems}
            pageNumber={itemsPageNumber}
          >
            { renderListItems() }
          </InfiniteScroller>
        )
        : renderListItems()
    );
  }

  const searchOnChange = useCallback((value) => {
    if (onCustomSearch) {
      onCustomSearch(value);
    } else {
      setSearchValue(value);
    }
  }, [onCustomSearch]);

  const itemChanged = useCallback((item) => {
    let cloneItems = structuredClone(items);
    cloneItems = cloneItems.filter((clonedItem) => item.id !== clonedItem.id);

    onChange(cloneItems, item);
  }, [items]);

  function renderListItems() {
    return (
      <ul
        className={`tyk-multiselect__list${(!serverLoad) ? ' tyk-multiselect__list--scroll' : ''}`}
        ref={itemsListRef}
      >
        {
          items.map((item) => (
            <MultiselectItem
              itemType={panelType}
              key={getItemIndex()}
              onChange={itemChanged}
              searchValue={customSearch ? '' : searchValue}
              item={item}
            />
          ))
        }
      </ul>
    );
  }

  return (
    <div className="tyk-multiselect__panel">
      <Input
        inputgroupaddonleft={
          <Icon type="magnifying-glass" />
        }
        name="search"
        onChange={searchOnChange}
        placeholder={inputPlaceholder}
        value={searchValue}
      />
      {
        items.length
          ? getItemsList()
          : (
            <Message theme="info">
              { noItemsMessage }
            </Message>
          )
      }
    </div>
  );
}

MultiselectPanel.propTypes = {
  customSearch: PropTypes.bool,
  onCustomSearch: PropTypes.func,
  panelType: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.instanceOf(Array),
  itemsPageNumber: PropTypes.number,
  itemsNrPages: PropTypes.number,
  inputPlaceholder: PropTypes.string,
  loadMoreItems: PropTypes.func,
  noItemsMessage: PropTypes.string,
  serverLoad: PropTypes.bool,
};

export default MultiselectPanel;
