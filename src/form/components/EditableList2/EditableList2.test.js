import React, { useState } from 'react';
import Input2 from '../Input2';
import EditableList2 from './index';

function isRequired(value) {
  return value ? '' : 'Field is required';
}

function Component(props) {
  const [value, setValue] = useState([]);

  return (
    <EditableList2
      onChange={setValue}
      value={value}
      label="Map Something to Something Else"
      addButtonName="Add Row"
      fields={[
        {
          component: Input2,
          styles: {
            width: '200px',
          },
          size: 4,
          props: {
            name: 'input',
            label: 'Something',
            theme: 'default rounded-corners',
            placeholder: 'Enter claim name',
            value: '',
            validate: isRequired,
          },
        },
      ]}
      {...props}
    />
  );
}

const selectors = {
  wrapper: '.editable-list__wrapper',
  header: '.editable-list__header',
  addButton: '.editable-list__header .tyk-button',
  list: '.editable-list__list',
  listItem: '.editable-list__item',
  errorMessage: '.tyk-form-control__error-message',
  itemDeleteButton: '.editable-list__item .tyk-button',
};

describe('EditableList2', () => {
  it('renders the component', () => {
    cy.mount(<Component />);

    cy.get(selectors.wrapper)
      .should('exist')
      .get(selectors.header)
      .should('exist');
  });

  it('does not render the list by default if it is empty, unless hideOnEmpty is set to false', () => {
    cy.mount(<Component />)
      .get(selectors.list)
      .should('not.exist');

    cy.mount(<Component hideOnEmpty={false} />)
      .get(selectors.list)
      .should('exist')
      .get(selectors.listItem)
      .should('have.length', 1);
  });

  it('clicking on the add button adds a new row', () => {
    cy.mount(<Component hideOnEmpty={false} />)
      .get(selectors.listItem)
      .should('have.length', 1); // the header

    cy.get(selectors.addButton)
      .click();

    cy.get(selectors.listItem)
      .should('have.length', 2); // header + 1 row
  });

  it('clicking on the add button two times triggers validation', () => {
    cy.mount(<Component hideOnEmpty={false} />)
      .get(selectors.addButton)
      .click();

    cy.get(selectors.errorMessage)
      .should('not.exist');

    cy.get(selectors.addButton)
      .click();

    cy.get(selectors.errorMessage)
      .should('exist');

    cy.get(selectors.listItem)
      .find('input')
      .type('anything');

    cy.get(selectors.errorMessage)
      .should('not.exist');
  });

  it('we can add multiple rows (if we pass validations)', () => {
    cy.mount(<Component hideOnEmpty={false} />)
      .get(selectors.addButton)
      .click();

    cy.get(selectors.listItem)
      .find('input')
      .type('anything');

    cy.get(selectors.addButton)
      .click();

    cy.get(selectors.listItem)
      .should('have.length', 3); // 1 header + 2 list items
  });

  it('we can remove rows by clicking on the item\'s remove icon', () => {
    cy.mount(<Component hideOnEmpty={false} />)
      .get(selectors.addButton)
      .click();

    cy.get(selectors.listItem)
      .should('have.length', 2); // 1 header + 1 list item

    cy.get(selectors.itemDeleteButton)
      .click();

    cy.get(selectors.listItem)
      .should('have.length', 1); // 1 header + 0 list items
  });

  it('can render with an error', () => {
    cy.mount(<Component error="something went wrong" />);

    cy.get(selectors.errorMessage)
      .should('exist');
  });

  it('can render in a disabled state', () => {
    cy.mount(<Component disabled hideOnEmpty={false} value={[['foo', 'row-1']]} />);

    cy.get(selectors.addButton)
      .should('not.exist');

    cy.get(selectors.listItem)
      .find('input')
      .should('have.attr', 'disabled');

    cy.get(selectors.itemDeleteButton)
      .should('have.class', 'disabled');
  });
});
