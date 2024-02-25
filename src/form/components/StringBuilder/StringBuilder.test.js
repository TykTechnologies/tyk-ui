import React from 'react';
import StringBuilder from './index';

describe('StringBuilder', () => {
  it('renders the component with proper classes and attributes based on props and tests basic functionality', () => {
    const onChangeMock = cy.stub().as('onChangeMock');
    const initialVal = 'https://petstore.swagger.io/v2/pet/{{.arguments.id}}/XdXd/{{.arguments.id}}';
    const options = [
      {
        id: '{{.arguments.id}}',
        name: 'userId',
        desc: 'Argument userId',
        className: 'data_source_argument',
      },
    ];
    cy.mount(
      <StringBuilder
        label="URL Builder"
        value={initialVal}
        placeholder="Please enter your url"
        onChange={onChangeMock}
        theme="default rounded-corners"
        dropdownTriggerKey="{"
        options={options}
      />,
    );

    // argument selection from dropdown
    cy.get('.string-builder__input')
      .should('have.value', initialVal)
      .type('{');

    cy.get('.string-builder-list li')
      .click();

    cy.get('@onChangeMock')
      .should('be.called');

    // Backspace on argument should delete the whole argument instead of single character
    cy.get('.string-builder__input')
      .should('have.value', `${initialVal}${options[0].id}`)
      .type('{backspace}');

    cy.get('.string-builder__input')
      .should('have.value', initialVal);

    // Backspace on normal character should delete only single character
    cy.get('.string-builder__input')
      .should('have.value', initialVal)
      .type('foo');

    cy.get('.string-builder__input')
      .should('have.value', `${initialVal}foo`)
      .type('{backspace}');

    cy.get('.string-builder__input')
      .should('have.value', `${initialVal}fo`);
  });
});
