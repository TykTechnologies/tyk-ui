import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import MultiselectPanel from './MultiselectPanel';
import MultiselectContext from './MultiselectContext';

const diffObjects = (value, items) => {
  const newItems = items.filter((item) => {
    const isCommon = value.filter(selectedItem => selectedItem.id === item.id).length > 0;

    return !isCommon;
  });

  return newItems;
};

class Multiselect extends Component {
  static propTypes = {
    customSearch: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    entityNamePlural: PropTypes.string,
    items: PropTypes.instanceOf(Array),
    itemDisplayTemplate: PropTypes.func,
    detailsDisplayTemplate: PropTypes.func,
    fieldsToSearchOn: PropTypes.instanceOf(Array),
    onChange: PropTypes.func,
    getItemDetails: PropTypes.func,
    itemsPageNumber: PropTypes.number,
    itemsNrPages: PropTypes.number,
    loadMoreItems: PropTypes.func,
    note: PropTypes.string,
    maxSelections: PropTypes.number,
    value: PropTypes.instanceOf(Array),
  };

  state = {
    opened: {},
  };

  constructor(props) {
    super(props);

    this.valueChange = this.valueChange.bind(this);
    this.itemsChange = this.itemsChange.bind(this);
  }

  onGetItemDetails(item) {
    const { getItemDetails } = this.props;

    this.setState((prevState) => {
      const tempState = Object.assign({}, prevState);
      tempState.opened[item.id] = !tempState.opened[item.id];

      return tempState;
    }, () => {
      if (getItemDetails) {
        getItemDetails(item);
      }
    });
  }

  getMultiselectError() {
    const { error } = this.props;

    return (error && error !== 'true' && error !== 'false')
      ? (
        <p
          className="tyk-form-control__error-message"
        >
          { error }
        </p>
      )
      : null;
  }

  getCssClasses() {
    const { error } = this.props;
    const cssClasses = ['tyk-multiselect'];

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  itemsChange(allItems, item) {
    const { value, onChange } = this.props;
    const valueClone = fromJS(value).toJS();

    valueClone.unshift(item);

    onChange(valueClone, item, 'added');
  }

  valueChange(value, item) {
    const { items, onChange } = this.props;
    const allItemsClone = fromJS(items).toJS();

    allItemsClone.unshift(item);

    onChange(value, item, 'removed');
  }

  render() {
    const {
      customSearch,
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
      note,
      value,
    } = this.props;
    const { opened } = this.state;

    return (
      <Fragment>
        <div className={this.getCssClasses()}>
          <MultiselectContext.Provider
            value={{
              disabled,
              parentContext: this,
              itemDisplayTemplate,
              detailsDisplayTemplate,
              fieldsToSearchOn,
              maxSelections,
              nrSelectedItems: value.length,
              onGetItemDetails: this.onGetItemDetails,
              opened,
            }}
          >
            <div className="tyk-multiselect__header">
              <div>
                { value.length }
                {' '}
                Selected
                {' '}
                { entityNamePlural }
              </div>
              <div>
                Select from existing
                { entityNamePlural }
              </div>
            </div>
            <div className="tyk-multiselect__panel-wrapper">
              <MultiselectPanel
                inputPlaceholder={`Search through selected ${entityNamePlural}`}
                noItemsMessage={`Selected ${entityNamePlural} will show here`}
                items={value}
                onChange={this.valueChange}
                panelType="selected"
              />
              <MultiselectPanel
                inputPlaceholder={`Search existing ${entityNamePlural}`}
                noItemsMessage={`No ${entityNamePlural} to display`}
                entityNamePlural={entityNamePlural}
                customSearch={!!customSearch}
                onCustomSearch={customSearch}
                items={diffObjects(value, items)}
                onChange={this.itemsChange}
                serverLoad={!!loadMoreItems}
                loadMoreItems={loadMoreItems}
                itemsPageNumber={itemsPageNumber}
                itemsNrPages={itemsNrPages}
                panelType="normal"
              />
            </div>
          </MultiselectContext.Provider>
        </div>
        <div>
          {
            note
              ? <p className="tyk-form-control__help-block">{ note }</p>
              : null
          }
        </div>
        { this.getMultiselectError() }
      </Fragment>
    );
  }
}

export default Multiselect;
