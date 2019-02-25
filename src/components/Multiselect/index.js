import React, { Component, Fragment } from 'react';

export { default as Multiselect } from './js/Multiselect';
export { default as FieldMultiselect } from './js/FieldMultiselect';

export default class Test extends Component {
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

  onMultiselectChange(selectedItems, item, action) {
    this.setState({
      selectedItems,
    });
  }

  getItemDetails(item) {
    const { items } = this.state;

    setTimeout(() => {
      const newItems = items.map((itm) => {
        if (item.id === itm.id) {
          itm.details = { prct: 'prct' };
        }

        return itm;
      });

      this.setState({
        items: newItems,
      });
    }, 2000);
  }

  itemDisplayTemplate(item) {
    return (
      <Fragment>
        <strong>ID: </strong>
        <span>{ item.id }</span>
      </Fragment>
    );
  }

  detailsDisplayTemplate(item) {
    return (
      <Fragment>
        <strong>DETAILS: </strong>
        <span>{ item.details.prct }</span>
      </Fragment>
    );
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

  customSearch(value) {
    const { items } = this.state;

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
        onChange={this.onMultiselectChange.bind(this)}
        getItemDetails={this.getItemDetails.bind(this)}
        itemDisplayTemplate={this.itemDisplayTemplate}
        detailsDisplayTemplate={this.detailsDisplayTemplate}
        loadMoreItems={this.loadMoreItems.bind(this)}
        itemsPageNumber={page}
        itemsNrPages={nrPages}
        customSearch={this.customSearch.bind(this)}
        maxSelections={3}
      />
    );
  }
}
