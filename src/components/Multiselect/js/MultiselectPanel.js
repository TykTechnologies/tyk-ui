import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { Input } from '../../Input';
import Icon from '../../Icon';
import Message from '../../Message';
import InfiniteScroller from '../../InfiniteScroller';
import MultiselectItem from './MultiselectItem';

class MultiselectPanel extends Component {
  static propTypes = {
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

  state = {
    searchValue: '',
  };

  constructor(props) {
    super(props);

    this.searchOnChange = this.searchOnChange.bind(this);
    this.itemChanged = this.itemChanged.bind(this);
    this.itemIndex = 0;
    this.itemsListRef = createRef();
  }

  getItemIndex() {
    this.itemIndex += 1;

    return this.itemIndex;
  }

  getItemsList() {
    const {
      itemsPageNumber,
      itemsNrPages,
      loadMoreItems,
      serverLoad,
    } = this.props;

    return (
      serverLoad
        ? (
          <InfiniteScroller
            refChild={this.itemsListRef}
            hasMore={itemsNrPages > itemsPageNumber}
            loadMore={loadMoreItems}
            pageNumber={itemsPageNumber}
          >
            { this.renderListItems() }
          </InfiniteScroller>
        )
        : this.renderListItems()
    );
  }

  searchOnChange(value) {
    const { onCustomSearch } = this.props;

    if (!onCustomSearch) {
      this.setState({
        searchValue: value,
      });
    } else {
      onCustomSearch(value);
    }
  }

  itemChanged(item) {
    const { items, onChange } = this.props;

    let cloneItems = fromJS(items).toJS();
    cloneItems = cloneItems.filter(clonedItem => item.id !== clonedItem.id);

    onChange(cloneItems, item);
  }

  renderListItems() {
    const {
      customSearch, items, panelType, serverLoad,
    } = this.props;
    const { searchValue } = this.state;
    return (
      <ul
        className={`tyk-multiselect__list${(!serverLoad) ? ' tyk-multiselect__list--scroll' : ''}`}
        ref={this.itemsListRef}
      >
        {
          items.map(item => (
            <MultiselectItem
              itemType={panelType}
              key={this.getItemIndex()}
              onChange={this.itemChanged}
              searchValue={customSearch ? '' : searchValue}
              item={item}
            />
          ))
        }
      </ul>
    );
  }

  render() {
    const {
      inputPlaceholder,
      noItemsMessage,
      items,
    } = this.props;
    const { searchValue } = this.state;

    return (
      <div className="tyk-multiselect__panel">
        <Input
          inputgroupaddonleft={
            <Icon type="search" />
          }
          name="search"
          onChange={this.searchOnChange}
          placeholder={inputPlaceholder}
          value={searchValue}
        />
        {
          items.length
            ? this.getItemsList()
            : (
              <Message
                theme="info"
              >
                { noItemsMessage }
              </Message>
            )
        }
      </div>
    );
  }
}

export default MultiselectPanel;
