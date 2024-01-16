import React, { useState } from 'react';
import Multiselect from './index';

const defaultItems = [
  { id: 1, name: 'item 1' },
  { id: 2, name: 'item 2' },
  { id: 3, name: 'item 3' },
  { id: 4, name: 'item 4' },
  { id: 5, name: 'item 5' },
  { id: 6, name: 'item 6' },
  { id: 7, name: 'item 7' },
  { id: 8, name: 'item 8' },
  { id: 9, name: 'item 9' },
];

function Component(props) {
  const [items, setItems] = useState(defaultItems);
  // eslint-disable-next-line react/prop-types
  const { value: initialValue, ...rest } = props;
  const [value, setValue] = useState(initialValue ?? []);
  return (
    <Multiselect
      entityName="Item"
      entityNamePlural="Items"
      items={items}
      fieldsToSearchOn={['name']}
      value={value}
      getItemDetails={(item) => setItems((xs) => xs.map((x) => (
        x.id === item.id
          ? { ...x, details: { ...x } }
          : x
      )))}
      itemDisplayTemplate={({ name }) => name}
      detailsDisplayTemplate={({ id, name }) => `${name} (${id})`}
      onChange={setValue}
      {...rest}
    />
  );
}

const selectors = {
  component: '.tyk-multiselect',
  panel: '.tyk-multiselect__panel',
  item: '.tyk-multiselect__list li',
  itemControlsAddRemove: '.tyk-multiselect-item__controls button:nth-child(1)',
  itemControlsDetails: '.tyk-multiselect-item__controls button:nth-child(2)',
  itemDetails: '.tyk-multiselect-item__details',
  message: '.tyk-message',
  searchInput: 'input[name="search"]',
};

describe('Multiselect', () => {
  it('renders the component which has two panels', () => {
    cy.mount(<Component />);

    cy.get(selectors.component)
      .should('exist')
      .get(selectors.panel)
      .should('have.length', 2);
  });

  it('calls the onChange callback with the selected item when clicking on the "add" control', () => {
    const onChange = cy.stub().as('onChange');
    const itemIndex = 2;
    const item = defaultItems[itemIndex];
    cy.mount(<Component onChange={onChange} />);

    cy.get(selectors.item)
      .eq(itemIndex)
      .find(selectors.itemControlsAddRemove)
      .click();

    cy.get('@onChange')
      .should('be.calledWith', [item]);
  });

  it('calls the getItemDetails callback when clicking on the "show details" control', () => {
    const getItemDetails = cy.stub().as('getItemDetails');
    const itemIndex = 3;
    const item = defaultItems[itemIndex];
    cy.mount(<Component getItemDetails={getItemDetails} />);

    cy.get(selectors.item)
      .eq(itemIndex)
      .find(selectors.itemControlsDetails)
      .click();

    cy.get('@getItemDetails')
      .should('be.calledWith', item);
  });

  it('the selected items panel shows a message if no item is selected and a list of the selected items otherwise', () => {
    cy.mount(<Component />);

    cy.get(selectors.panel)
      .eq(0)
      .as('selectedItemsPanel')
      .find(selectors.message)
      .should('exist');

    cy.get(selectors.item)
      .eq(2)
      .find(selectors.itemControlsAddRemove)
      .click();

    cy.get('@selectedItemsPanel')
      .find(selectors.message)
      .should('not.exist');
    cy.get('@selectedItemsPanel')
      .find(selectors.item)
      .should('have.length', 1);
  });

  it('you can remove items from being selected by clicking on the "remove" control of the selected item', () => {
    const value = defaultItems.slice(0, 2);
    cy.mount(<Component value={value} />);

    cy.get(selectors.panel)
      .eq(0)
      .as('selectedItemsPanel');

    cy.get('@selectedItemsPanel')
      .find(selectors.item)
      .should('have.length', value.length);

    cy.get('@selectedItemsPanel')
      .find(selectors.item)
      .eq(0)
      .find(selectors.itemControlsAddRemove)
      .click();

    cy.get('@selectedItemsPanel')
      .find(selectors.item)
      .should('have.length', value.length - 1);
  });

  it('you can filter items using the search input from a panel', () => {
    cy.mount(<Component />);

    cy.get(selectors.panel)
      .eq(1)
      .as('itemsPanel');

    cy.get('@itemsPanel')
      .find(selectors.item)
      .should('have.length', defaultItems.length);

    cy.get('@itemsPanel')
      .find(selectors.searchInput)
      .type('item 3');

    cy.get('@itemsPanel')
      .find(selectors.item)
      .should('have.length', 1);
  });
});
