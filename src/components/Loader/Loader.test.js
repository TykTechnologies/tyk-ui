import React from 'react';
import Loader from './index';

describe('Loader', () => {
  const selectors = {
    loader: '.loading',
    wrapper: '.tyk-loading__wrapper',
  };

  it('renders the loader component, by default with position relative and no wrapper', () => {
    cy.mount(<Loader />)
      .get(selectors.loader)
      .should('exist')
      .and('have.css', 'position', 'relative')
      .get(selectors.wrapper)
      .should('not.exist');
  });

  it('the position can be configured', () => {
    cy.mount(<Loader position="absolute" />)
      .get(selectors.loader)
      .should('have.css', 'position', 'absolute');
  });

  it('the wrapper can be displayed with the "withbackground" prop', () => {
    cy.mount(<Loader withbackground />)
      .get(selectors.wrapper)
      .should('exist');
  });
});
