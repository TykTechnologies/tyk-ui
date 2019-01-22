import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { Input } from '../../Input';
import { Message } from '../../Message';
import { InfiniteScroller } from '../../InfiniteScroller';
import MultiselectItem from './MultiselectItem';

class MultiselectPanel extends Component {
  static propTypes = {
    onCustomSearch: PropTypes.func,
    panelType: PropTypes.string,
    onChange: PropTypes.func,
    items: PropTypes.array,
    inputPlaceholder: PropTypes.string,
    noItemsMessage: PropTypes.string
  };

  state = {
    searchValue: ''
  };

  static propTypes = {
    items: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.itemsListRef = createRef();
    this.searchOnChange = this.searchOnChange.bind(this);
  }

  searchOnChange(value) {
    const { onCustomSearch } = this.props;
    
    if(!onCustomSearch) {
      this.setState({
        searchValue: value
      });
    } else {
      onCustomSearch(value);
    }
  }

  itemChanged(item) {
    const { items, onChange } = this.props;

    let cloneItems = fromJS(items).toJS();
    cloneItems = cloneItems.filter((clonedItem) => {
      return item.id !== clonedItem.id;
    });

    onChange(cloneItems, item);
  }

  renderListItems() {
    const { customSearch, items, panelType, serverLoad } = this.props;
    const { searchValue } = this.state;

    return (
      <ul
        className={ "tyk-multiselect__list" + ((!serverLoad) ? ' tyk-multiselect__list--scroll' : '') }
        ref={ this.itemsListRef }
      >
        {
          items.map((item, key) => {
            return (
              <MultiselectItem
                itemType={ panelType }
                key={ key }
                onChange={ this.itemChanged.bind(this) }
                searchValue={ customSearch ? '' : searchValue }
                item={ item }
              />
            );
          })
        }
      </ul>
    );
  }

  render() {
    const {
      inputPlaceholder,
      itemsPageNumber,
      itemsNrPages,
      noItemsMessage,
      loadMoreItems,
      items,
      serverLoad
    } = this.props;
    const { searchValue } = this.state;

    return (
      <div className="tyk-multiselect__panel">
        <Input
          inputGroupAddonLeft={
            <Icon type="search" />
          }
          name="search"
          onChange={ this.searchOnChange }
          placeholder={ inputPlaceholder }
          value={ searchValue }
        />
        {
          items.length
            ? serverLoad
                ? <InfiniteScroller
                    refChild={ this.itemsListRef }
                    hasMore={ itemsNrPages > itemsPageNumber }
                    loadMore={ loadMoreItems }
                    pageNumber={ itemsPageNumber }
                  >
                    { this.renderListItems() }
                  </InfiniteScroller>
                : this.renderListItems()
            : <Message
                theme="info"
              >
                { noItemsMessage }
              </Message>
        }
      </div>
    );
  }
};

export default MultiselectPanel;
