import React from 'react';
import Checkbox from './index';

describe('Checkbox', () => {
  it('Checkbox : with error', () => {
    const label = 'This is a checkbox';
    const error = 'Please fix the error';
    cy.mount(
      <Checkbox
        label={label}
        error={error}
        id="testCheckbox"
      />,
    );

    cy.contains(label).should('exist');
    cy.contains(error).should('exist');
    cy.get('#testCheckbox').should('not.be.checked');
    cy.contains(label).should('exist').click();
    cy.get('#testCheckbox').should('be.checked');
  });

  it('Checkbox : with disabled checked', () => {
    const label = 'This is a checkbox';
    cy.mount(<Checkbox
      label={label}
      id="testCheckbox"
      disabled
    />);

    cy.contains(label).should('exist');
    cy.get('#testCheckbox').should('not.be.checked');
    cy.contains(label).should('exist').click();
    cy.get('#testCheckbox').should('not.be.checked');
  });
});
