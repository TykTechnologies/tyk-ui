import React, { Component, Fragment } from 'react';
import Multiselect from './js/Multiselect';

export { default as FieldMultiselect } from './js/FieldMultiselect';
export { Multiselect };

export default class Test extends Component {
  static itemDisplayTemplate(item) {
    return (
      <Fragment>
        <strong>ID: </strong>
        <span>{ item.id }</span>
      </Fragment>
    );
  }

  static detailsDisplayTemplate(item) {
    return (
      <Fragment>
        <strong>DETAILS: </strong>
        <span>{ item.details.prct }</span>
      </Fragment>
    );
  }

  state = {
    items: [
      { id: 1, name: 'item 1' },
      { id: 2, name: 'item 2' },
      { id: 3, name: 'item 3' },
      { id: 4, name: 'item 4' },
      { id: 5, name: 'item 5' },
      { id: 6, name: 'item 6' },
      { id: 7, name: 'item 7' },
      { id: 8, name: 'item 8' },
      { id: 9, name: 'item 9' },
    ],
    selectedItems: [
      { id: 2, name: 'item 2' },
      { id: 5, name: 'item 5' },
    ],
    nrPages: 1,
    page: 0,
  };

  onMultiselectChange(selectedItems) {
    this.setState({
      selectedItems,
    });
  }

  getItemDetails(item) {
    const { items } = this.state;

    setTimeout(() => {
      const newItems = items.map((itm) => {
        const tempItem = Object.assign({}, itm);
        if (item.id === tempItem.id) {
          tempItem.details = { prct: 'prct' };
        }

        return tempItem;
      });

      this.setState({
        items: newItems,
      });
    }, 2000);
  }

  loadMoreItems(page) {
    const { items } = this.state;

    setTimeout(() => {
      this.setState({
        page,
        items: items.concat([
          { id: 10, name: 'item 10' },
          { id: 11, name: 'item 11' },
          { id: 12, name: 'item 12' },
          { id: 13, name: 'item 31' },
          { id: 14, name: 'item 14' },
          { id: 15, name: 'item 15' },
          { id: 16, name: 'item 16' },
          { id: 17, name: 'item 17' },
          { id: 18, name: 'item 18' },
          { id: 19, name: 'item 19' },
        ]),
      });
    }, 2000);
  }

  customSearch() {
    setTimeout(() => {
      this.setState({
        page: 0,
        items: [
          { id: 60, name: 'item 60' },
          { id: 66, name: 'item 66' },
          { id: 62, name: 'item 62' },
          { id: 63, name: 'item 36' },
          { id: 64, name: 'item 64' },
          { id: 65, name: 'item 65' },
          { id: 66, name: 'item 66' },
          { id: 67, name: 'item 67' },
          { id: 68, name: 'item 68' },
          { id: 69, name: 'item 19' },
        ],
      });
    }, 2000);
  }

  render() {
    const {
      items, selectedItems, nrPages, page,
    } = this.state;

    return (
      <Multiselect
        entityName="Certificate"
        entityNamePlural="Certificates"
        fieldsToSearchOn={['name']}
        items={items}
        value={selectedItems}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={this.onMultiselectChange.bind(this)}
        // eslint-disable-next-line react/jsx-no-bind
        getItemDetails={this.getItemDetails.bind(this)}
        itemDisplayTemplate={Test.itemDisplayTemplate}
        detailsDisplayTemplate={Test.detailsDisplayTemplate}
        // eslint-disable-next-line react/jsx-no-bind
        loadMoreItems={this.loadMoreItems.bind(this)}
        itemsPageNumber={page}
        itemsNrPages={nrPages}
        // eslint-disable-next-line react/jsx-no-bind
        customSearch={this.customSearch.bind(this)}
        maxSelections={3}
      />
    );
  }
}
