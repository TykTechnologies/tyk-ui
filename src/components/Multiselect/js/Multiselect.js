import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import './MultiselectPanel';
import MultiselectContext from './MultiselectContext';

class Multiselect extends Component {
  static propTypes = {
    customSearch: PropTypes.func,
    disabled: PropTypes.bool,
    entityName: PropTypes.string,
    entityNamePlural: PropTypes.string,
    itemDisplayTemplate: PropTypes.func,
    detailsDisplayTemplate: PropTypes.func,
    fieldsToSearchOn: PropTypes.array,
    onChange: PropTypes.func,
    getItemDetails: PropTypes.func,
    itemsPageNumber: PropTypes.number,
    itemsNrPages: PropTypes.number,
    loadMoreItems: PropTypes.func,
    note: PropTypes.string,
    maxSelections: PropTypes.number
  };

  state = {
    opened: {}
  };

  diffObjects(value, items) {
    let newItems = items.filter((item) => {
      let isCommon = value.filter((selectedItem) => {
        return selectedItem.id === item.id;
      }).length > 0;

      return !isCommon;
    });

    return newItems;
  }

  itemsChange(allItems, item) {
    const { value, onChange } = this.props;
    let valueClone = fromJS(value).toJS();

    valueClone.unshift(item);

    onChange(valueClone, item, 'added');
  }

  valueChange(value, item) {
    const { items, onChange } = this.props;
    let allItemsClone = fromJS(items).toJS();

    allItemsClone.unshift(item);

    onChange(value, item, 'removed');
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

  getMultiselectError() {
    const { error } = this.props;

    return (error && error !== 'true' && error !=='false')
      ? <p
          className="tyk-form-control__error-message"
        >
          { error }
        </p>
      : null;
  }

  getCssClasses() {
    const { error } = this.props;
    let cssClasses = ['tyk-multiselect'];

    if(error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  render() {
    const {
      customSearch,
      entityName,
      entityNamePlural,
      disabled,
      itemDisplayTemplate,
      detailsDisplayTemplate,
      fieldsToSearchOn,
      items,
      itemsPageNumber,
      itemsNrPages,
      loadMoreItems,
      maxSelections,
      onChange,
      value
    } = this.props;
    const { opened } = this.state;

    return (
      <Fragment>
        <div className={ this.getCssClasses() }>
          <MultiselectContext.Provider
            value={{
              disabled: disabled,
              parentContext: this,
              itemDisplayTemplate,
              detailsDisplayTemplate,
              fieldsToSearchOn,
              maxSelections,
              nrSelectedItems: value.length,
              onGetItemDetails: this.onGetItemDetails,
              opened
            }}
          >
            <div class="tyk-multiselect__header">
              <div>{ value.length } Selected { entityNamePlural }</div>
              <div>Select from existing { entityNamePlural }</div>
            </div>
            <div className="tyk-multiselect__panel-wrapper">
              <MultiselectPanel
                inputPlaceholder={ `Search through selected ${ entityNamePlural }` }
                noItemsMessage={ `Selected ${ entityNamePlural } will show here` }
                items={ value }
                onChange={ this.valueChange.bind(this) }
                panelType="selected"
              />
              <MultiselectPanel
                inputPlaceholder={ `Search existing ${ entityNamePlural }` }
                noItemsMessage={ `No ${ entityNamePlural } to display` }
                entityNamePlural={ entityNamePlural }
                customSearch={ customSearch ? true : false }
                onCustomSearch={ customSearch }
                items={ this.diffObjects(value, items) }
                onChange={ this.itemsChange.bind(this) }
                serverLoad={ loadMoreItems ? true : false }
                loadMoreItems={ loadMoreItems }
                itemsPageNumber={ itemsPageNumber }
                itemsNrPages={ itemsNrPages }
                panelType="normal"
              />
            </div>
          </MultiselectContext.Provider>
        </div>
        <div>
        {
          this.props.note
            ? <p className="tyk-form-control__help-block">{ this.props.note }</p>
            : null
        }
        </div>
        { this.getMultiselectError() }
      </Fragment>
    );
  }
};

export default Multiselect;
