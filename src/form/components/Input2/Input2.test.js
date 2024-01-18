import React from 'react';
import Input2 from './index';

describe('Input2', () => {
  it('sets theme classes and input value', () => {
    cy.mount(
      <Input2
        theme="default rounded-corners"
        value="my value"
        wrapperClassName="myclass"
      />,
    );

    cy.get('.myclass.tyk-form-group--default.tyk-form-group--rounded-corners')
      .get('input')
      .should('have.value', 'my value');
  });

  it('displays the label with the correct width', () => {
    cy.mount(
      <Input2
        theme="default inline rounded-corners"
        label="my label"
        labelwidth="200px"
      />,
    );

    cy.get('label')
      .should('have.text', 'my label')
      .and('have.css', 'width', '200px');
  });

  it('displays errors and notes', () => {
    cy.mount(
      <Input2
        theme="default rounded-corners"
        error={(
          <span>
            <span>Something wrong!</span>
            <a href="https://tyk.io">click here</a>
          </span>
        )}
        note="This is important to know."
      />,
    );

    cy.get('.tyk-form-group')
      .should('have.class', 'has-error');
    cy.get('.tyk-form-control__help-block')
      .should('have.text', 'This is important to know.');
    cy.get('.tyk-form-control__error-message')
      .should('have.text', 'Something wrong!click here');
  });

  it('supports both left and right addons', () => {
    cy.mount(
      <Input2
        inputgroupaddonleft={<span>left addon</span>}
        inputgroupaddonright={<span>right addon</span>}
      />,
    );

    cy.get('.tyk-input-group')
      .children()
      .as('children');
    cy.get('@children')
      .should('have.length', 3);
    cy.get('@children')
      .first()
      .should('have.class', 'tyk-input-group__addon')
      .and('have.text', 'left addon');
    cy.get('@children')
      .last()
      .should('have.class', 'tyk-input-group__addon')
      .and('have.text', 'right addon');
  });

  it('calls onChange callback with the current value', () => {
    const onChange = cy.stub().as('onChange');

    cy.mount(
      <Input2
        onChange={onChange}
      />,
    );

    cy.get('input')
      .type('foo');
    cy.get('@onChange')
      .should('be.calledWith', Cypress.sinon.match.any, 'foo');
  });

  it('renders no input in readonly mode', () => {
    cy.mount(
      <Input2
        value="my value"
        readOnly
      />,
    );

    cy.get('input').should('not.exist');
    cy.get('.tyk-form-group').should('have.text', 'my value');
  });
});
