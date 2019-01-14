import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import { Input } from '../../Input';
import MultiselectItem from './MultiselectItem';

class MultiselectPanel extends Component {
  static propTypes = {
    panelType: PropTypes.string,
    onChange: PropTypes.func,
    items: PropTypes.array
  };

  state = {
    searchValue: '',
    customSearch: PropTypes.bool
  };

  static propTypes = {
    items: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.searchOnChange = this.searchOnChange.bind(this);
  }

  searchOnChange(value) {
    this.setState({
      searchValue: value
    });
  }

  itemChanged(item) {
    const { items, onChange } = this.props;

    let cloneItems = fromJS(items).toJS();
    cloneItems = cloneItems.filter((clonedItem) => {
      return item.id !== clonedItem.id;
    });

    onChange(cloneItems, item);
  }

  render() {
    const {
      items,
      customSearch,
      panelType
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
          value={ searchValue }
        />
        <ul className="tyk-multiselect__list">
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
      </div>
    );
  }
};

export default MultiselectPanel;
