export { default as Multiselect } from './js/Multiselect';
import React, { Component } from 'react';

export default class Test extends Component {

  state = {
    items: [
      { id: 1, name: "item 1"},
      { id: 2, name: "item 2"},
      { id: 3, name: "item 3"},
      { id: 4, name: "item 4"},
      { id: 5, name: "item 5"}
    ],
    selectedItems: [
      { id: 2, name: "item 2"},
      { id: 5, name: "item 5"}
    ]
  };

  onMultiselectChange(selectedItems, items, item, action) {
    this.setState({
      selectedItems,
      items
    });
  }

  render() {
    const { items, selectedItems } = this.state;

    return (
      <Multiselect
        fieldsToSearchOn={['name']}
        items={ items }
        selectedItems={ selectedItems }
        onChange={this.onMultiselectChange.bind(this)}
      />
    );
  }
}
