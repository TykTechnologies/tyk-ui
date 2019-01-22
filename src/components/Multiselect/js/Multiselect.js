import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import './MultiselectPanel';
import MultiselectContext from './MultiselectContext';

class Multiselect extends Component {
  static propTypes = {
    customSearch: PropTypes.func,
    entityName: PropTypes.string,
    entityNamePlural: PropTypes.string,
    itemDisplayTemplate: PropTypes.func,
    detailsDisplayTemplate: PropTypes.func,
    fieldsToSearchOn: PropTypes.array,
    onChange: PropTypes.func,
    getItemDetails: PropTypes.func,
    itemsPageNumber: PropTypes.number,
    itemsNrPages: PropTypes.number,
    loadMoreItems: PropTypes.func
  };

  state = {
    opened: {}
  };

  diffObjects(selectedItems, items) {
    let newItems = items.filter((item) => {
      let isCommon = selectedItems.filter((selectedItem) => {
        return selectedItem.id === item.id;
      }).length > 0;

      return !isCommon;
    });

    return newItems;
  }

  itemsChange(allItems, item) {
    const { selectedItems, onChange } = this.props;
    let selectedItemsClone = fromJS(selectedItems).toJS();

    selectedItemsClone.unshift(item);

    onChange(selectedItemsClone, item, 'added');
  }

  selectedItemsChange(selectedItems, item) {
    const { items, onChange } = this.props;
    let allItemsClone = fromJS(items).toJS();

    allItemsClone.unshift(item);

    onChange(selectedItems, item, 'removed');
  }

  onGetItemDetails(item) {
    const { getItemDetails } = this.props;

    this.setState((prevState) => {
      prevState.opened[item.id] = !prevState.opened[item.id];

      return prevState;
    }, () => {
      getItemDetails && getItemDetails(item);
    });
  }

  render() {
    const {
      customSearch,
      entityName,
      entityNamePlural,
      itemDisplayTemplate,
      detailsDisplayTemplate,
      fieldsToSearchOn,
      items,
      itemsPageNumber,
      itemsNrPages,
      loadMoreItems,
      onChange,
      selectedItems
    } = this.props;
    const { opened } = this.state;

    return (
      <div className="tyk-multiselect">
        <MultiselectContext.Provider
          value={{
            parentContext: this,
            itemDisplayTemplate,
            detailsDisplayTemplate,
            fieldsToSearchOn,
            onGetItemDetails: this.onGetItemDetails,
            opened
          }}
        >
          <MultiselectPanel
            inputPlaceholder={ `Search through selected ${ entityNamePlural }` }
            noItemsMessage={ `Selected ${ entityNamePlural } will show here` }
            items={ selectedItems }
            onChange={ this.selectedItemsChange.bind(this) }
            panelType="selected"
          />
          <MultiselectPanel
            inputPlaceholder={ `Search existing ${ entityNamePlural }` }
            noItemsMessage={ `No ${ entityNamePlural } to display` }
            entityNamePlural={ entityNamePlural }
            customSearch={ customSearch ? true : false }
            onCustomSearch={ customSearch }
            items={ this.diffObjects(selectedItems, items) }
            onChange={ this.itemsChange.bind(this) }
            serverLoad={ loadMoreItems ? true : false }
            loadMoreItems={ loadMoreItems }
            itemsPageNumber={ itemsPageNumber }
            itemsNrPages={ itemsNrPages }
            panelType="normal"
          />
        </MultiselectContext.Provider>
      </div>
    );
  }
};

export default Multiselect;
