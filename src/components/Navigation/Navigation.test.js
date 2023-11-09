import React from 'react';
import Navigation from './index';

describe('Navigation', () => {
  const selectors = {
    navigation: '.tyk-navigation',
    item: '.tyk-navigation-item',
  };

  it('renders the component', () => {
    cy.mount(<Navigation />)
      .get(selectors.navigation)
      .should('exist');
  });

  it('can have navigation items as children', () => {
    cy.mount(
      <Navigation>
        <Navigation.Item>item 1</Navigation.Item>
        <Navigation.Item>item 2</Navigation.Item>
      </Navigation>,
    )
      .get(selectors.item)
      .should('have.length', 2);
  });
});
