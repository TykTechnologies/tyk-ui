import React from 'react';
import MaskSecret from './index';

describe('MaskSecret', () => {
  it('masks the value by default', () => {
    cy.mount(<MaskSecret value="mysecret" />);

    cy.get('.tyk-mask-secret__value').should('have.text', '••••••••');
    cy.get('.tyk-mask-secret__toggle')
      .should('have.attr', 'aria-label', 'Show secret');
    cy.get('.tyk-mask-secret__toggle .fa-eye').should('exist');
  });

  it('reveals the value when the toggle is clicked', () => {
    cy.mount(<MaskSecret value="mysecret" />);

    cy.get('.tyk-mask-secret__toggle').click();

    cy.get('.tyk-mask-secret__value').should('have.text', 'mysecret');
    cy.get('.tyk-mask-secret__toggle')
      .should('have.attr', 'aria-label', 'Hide secret');
    cy.get('.tyk-mask-secret__toggle .fa-eye-slash').should('exist');
  });

  it('re-masks the value when the toggle is clicked a second time', () => {
    cy.mount(<MaskSecret value="mysecret" />);

    cy.get('.tyk-mask-secret__toggle').click();
    cy.get('.tyk-mask-secret__toggle').click();

    cy.get('.tyk-mask-secret__value').should('have.text', '••••••••');
    cy.get('.tyk-mask-secret__toggle')
      .should('have.attr', 'aria-label', 'Show secret');
  });

  it('masks bullet count matches value length', () => {
    cy.mount(<MaskSecret value="abc" />);

    cy.get('.tyk-mask-secret__value').should('have.text', '•••');
  });

  it('shows a dash and no toggle button when value is empty', () => {
    cy.mount(<MaskSecret />);

    cy.get('.tyk-mask-secret__value').should('have.text', '-');
    cy.get('.tyk-mask-secret__toggle').should('not.exist');
  });

  it('applies an additional className to the root element', () => {
    cy.mount(<MaskSecret value="secret" className="my-class" />);

    cy.get('.tyk-mask-secret.my-class').should('exist');
  });

  it('is always masked on initial mount (simulating page refresh)', () => {
    cy.mount(<MaskSecret value="refreshtest" />);

    cy.get('.tyk-mask-secret__value').should('have.text', '•••••••••••');
  });
});
