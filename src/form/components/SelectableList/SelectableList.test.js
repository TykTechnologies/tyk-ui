import React from 'react';
import SelectableList from './index';

// eslint-disable-next-line react/prop-types
function Component(props) {
  return (
    <SelectableList {...props} />
  );
}

const items = [
  { name: 'Item one', id: '1' },
  { name: 'Item two', id: '2' },
  { name: 'Item three', id: '3' },
];

const selectors = {
  component: '.tyk-selectable-list',
  message: '.tyk-message',
  item: '.tyk-selectable-list li',
  icon: '.tyk-icon',
};

describe('SelectableList', () => {
  it('renders the component with the default "no items" message', () => {
    cy.mount(<Component />)
      .get(selectors.component)
      .should('exist')
      .get(selectors.message)
      .should('exist')
      .and('have.text', 'No items in the list');
  });

  it('the "no items" message can be customized', () => {
    const message = 'another message';
    cy.mount(<Component noItemsMessage={message} />)
      .get(selectors.message)
      .should('have.text', message);
  });

  it('renders the component with items', () => {
    cy.mount(<Component items={items} />)
      .get(selectors.item)
      .should('have.length', items.length);
  });

  it('you can specify what to be rendered for an item using itemTemplate', () => {
    cy.mount(<Component items={items} itemTemplate={(item) => item.id} />)
      .get(selectors.item)
      .eq(0)
      .should('have.text', items[0].id);
  });

  it('you can specify a value', () => {
    cy.mount(<Component items={items} value={['1', '3']} />)
      .get(selectors.item)
      .eq(0)
      .find('input')
      .should('be.checked')
      .get(selectors.item)
      .eq(1)
      .find('input')
      .should('not.be.checked')
      .get(selectors.item)
      .eq(2)
      .find('input')
      .should('be.checked');
  });

  it('calls the onChange callback when the value changes', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<Component items={items} onChange={onChange} />)
      .get(selectors.item)
      .eq(1)
      .find('input')
      .check();
    cy.get('@onChange')
      .should('be.called');
  });

  it('can specify another property of the item as the identifier', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<Component items={items} primaryKey="name" onChange={onChange} />)
      .get(selectors.item)
      .eq(1)
      .find('input')
      .check();
    cy.get('@onChange')
      .should('be.calledWith', [items[1].name]);
  });

  it('can have a custom css class', () => {
    const wrapperClassName = 'selectable-list-1';
    cy.mount(<Component wrapperClassName={wrapperClassName} />)
      .get(selectors.component)
      .should('have.class', wrapperClassName);
  });

  it('can display an icon instead of the checkbox', () => {
    cy.mount(<Component items={items} checkboxalticon="chevron-right" />)
      .get(selectors.icon)
      .should('exist')
      .get(selectors.item)
      .find('input')
      .should('not.be.visible');
  });
});
