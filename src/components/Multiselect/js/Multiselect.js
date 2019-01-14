import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import './MultiselectPanel';
import MultiselectContext from './MultiselectContext';

class Multiselect extends Component {
  static propTypes = {
    itemDisplayTemplate: PropTypes.func,
    fieldsToSearchOn: PropTypes.array,
    onChange: PropTypes.func
  };

  diffObjects(selectedItems, items) {
    return items.filter((item) => {
      let isCommon = selectedItems.filter((selectedItem) => {
        return selectedItem.id === item.id;
      }).length > 0;

      return !isCommon;
    });
  }

  itemsChange(allItems, item) {
    const { selectedItems, onChange } = this.props;
    let selectedItemsClone = fromJS(selectedItems).toJS();

    selectedItemsClone.unshift(item);

    onChange(selectedItemsClone, allItems, item, 'added');
  }

  selectedItemsChange(selectedItems, item) {
    const { items, onChange } = this.props;
    let allItemsClone = fromJS(items).toJS();

    allItemsClone.unshift(item);

    onChange(selectedItems, allItemsClone, item, 'removed');
  }

  render() {
    const {
      itemDisplayTemplate,
      fieldsToSearchOn,
      items,
      onChange,
      selectedItems
    } = this.props;

    return (
      <div className="tyk-multiselect">
        <MultiselectContext.Provider
          value={{
            itemDisplayTemplate,
            fieldsToSearchOn
          }}
        >
          <MultiselectPanel
            items={ selectedItems }
            onChange={ this.selectedItemsChange.bind(this) }
            panelType="selected"
          />
          <MultiselectPanel
            customSearch={ onChange ? true : false }
            items={ this.diffObjects(selectedItems, items) }
            onChange={ this.itemsChange.bind(this) }
            panelType="normal"
          />
        </MultiselectContext.Provider>
      </div>
    );
  }
};

export default Multiselect;
