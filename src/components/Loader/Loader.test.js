import React from 'react';
import Loader from './index';

describe('Loader', () => {
  const classes = {
    typeCircular: 'loader-type-circular',
    typeLinear: 'loader-type-linear',
    sizeBig: 'loader-size-big',
    sizeSmall: 'loader-size-small',
    isLoaded: 'is-loaded',
  };
  const selectors = {
    loader: '.loading',
    wrapper: '.tyk-loading__wrapper',
  };

  it('renders the loader component, by default with type circular, size big, position relative and no wrapper', () => {
    cy.mount(<Loader />);

    cy.get(selectors.loader)
      .should('exist')
      .and('have.class', classes.typeCircular)
      .and('have.class', classes.sizeBig)
      .and('have.css', 'position', 'relative')
      .get(selectors.wrapper)
      .should('not.exist');
  });

  it('the size of the circular loader can be small or it can be custom', () => {
    cy.mount(<Loader size="small" />);

    cy.get(selectors.loader)
      .should('have.class', classes.sizeSmall);

    const customSize = '100px';
    cy.mount(<Loader size={customSize} />);

    cy.get(selectors.loader)
      .should('have.css', '--loader-size', customSize);
  });

  it('the type of the loader can be "linear"', () => {
    cy.mount(<Loader type="linear" />);

    cy.get(selectors.loader)
      .should('have.class', classes.typeLinear);
  });

  it('the linear loader can be in a loaded state', () => {
    cy.mount(<Loader type="linear" isLoaded />);

    cy.get(selectors.loader)
      .should('have.class', classes.typeLinear)
      .and('have.class', classes.isLoaded);
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
