import React from 'react';
import Row from './index';

const classes = {
  noGutter: 'no-gutters',
  gutterless: 'tyk-row--gutterless',
};

const selectors = {
  component: '.tyk-row',
};

describe('Row', () => {
  it('renders the component', () => {
    cy.mount(<Row />)
      .get(selectors.component)
      .should('exist');
  });

  it('can have custom class names', () => {
    const customClass = 'custom-class';
    cy.mount(<Row className={customClass} />)
      .get(selectors.component)
      .should('have.class', customClass);
  });

  it('adds classes that remove gutters', () => {
    cy.mount(<Row nogutters />)
      .get(selectors.component)
      .should('have.class', classes.noGutter)
      .and('have.class', classes.gutterless);
  });

  it('renders its children', () => {
    const content = <div id="custom-content">custom content</div>;
    cy.mount(<Row>{content}</Row>)
      .get(selectors.component)
      .find('#custom-content')
      .should('exist');
  });
});
