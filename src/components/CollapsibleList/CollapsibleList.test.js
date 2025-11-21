import React from 'react';
import CollapsibleList from './index';

describe('CollapsibleList', () => {
  it('renders the component with items', () => {
    cy.mount(
      <CollapsibleList open={false} visibleCount={2}>
        <CollapsibleList.Item>Item 1</CollapsibleList.Item>
        <CollapsibleList.Item>Item 2</CollapsibleList.Item>
        <CollapsibleList.Item>Item 3</CollapsibleList.Item>
      </CollapsibleList>,
    );

    cy.get('.tyk-collapsible-list').should('exist');
    cy.get('.tyk-collapsible-list__list').should('exist');
    cy.contains('Item 1').should('exist');
    cy.contains('Item 2').should('exist');
    cy.contains('Item 3').should('exist');
  });

  it('shows only visible items when collapsed', () => {
    cy.mount(
      <CollapsibleList open={false} visibleCount={2}>
        <CollapsibleList.Item>Visible 1</CollapsibleList.Item>
        <CollapsibleList.Item>Visible 2</CollapsibleList.Item>
        <CollapsibleList.Item>Hidden 3</CollapsibleList.Item>
        <CollapsibleList.Item>Hidden 4</CollapsibleList.Item>
      </CollapsibleList>,
    );

    cy.get('.tyk-collapsible-list__item-wrapper--visible').should('have.length', 2);
    cy.get('.tyk-collapsible-list__item-wrapper--hidden').should('have.length', 2);
  });

  it('shows all items when open is true', () => {
    cy.mount(
      <CollapsibleList open={true} visibleCount={1}>
        <CollapsibleList.Item>Item 1</CollapsibleList.Item>
        <CollapsibleList.Item>Item 2</CollapsibleList.Item>
        <CollapsibleList.Item>Item 3</CollapsibleList.Item>
      </CollapsibleList>,
    );

    cy.get('.tyk-collapsible-list__item-wrapper--visible').should('have.length', 3);
    cy.get('.tyk-collapsible-list__item-wrapper--hidden').should('not.exist');
  });

  it('hides all items when visibleCount is 0 and open is false', () => {
    cy.mount(
      <CollapsibleList open={false} visibleCount={0}>
        <CollapsibleList.Item>Item 1</CollapsibleList.Item>
        <CollapsibleList.Item>Item 2</CollapsibleList.Item>
      </CollapsibleList>,
    );

    cy.get('.tyk-collapsible-list__item-wrapper--hidden').should('have.length', 2);
    cy.get('.tyk-collapsible-list__item-wrapper--visible').should('not.exist');
  });

  it('applies custom className', () => {
    cy.mount(
      <CollapsibleList className="custom-class" open={false} visibleCount={1}>
        <CollapsibleList.Item>Item 1</CollapsibleList.Item>
      </CollapsibleList>,
    );

    cy.get('.tyk-collapsible-list')
      .should('have.class', 'custom-class');
  });

  it('applies animation classes to items beyond visibleCount', () => {
    cy.mount(
      <CollapsibleList open={true} visibleCount={1}>
        <CollapsibleList.Item>Always visible</CollapsibleList.Item>
        <CollapsibleList.Item>Animated 1</CollapsibleList.Item>
        <CollapsibleList.Item>Animated 2</CollapsibleList.Item>
      </CollapsibleList>,
    );

    cy.get('.tyk-collapsible-list__item-wrapper--animated').should('have.length', 2);
  });

  it('renders items with custom content', () => {
    cy.mount(
      <CollapsibleList open={true} visibleCount={2}>
        <CollapsibleList.Item>
          <div className="custom-content">
            <span>Label:</span>
            <strong>Value</strong>
          </div>
        </CollapsibleList.Item>
      </CollapsibleList>,
    );

    cy.get('.custom-content').should('exist');
    cy.contains('Label:').should('exist');
    cy.contains('Value').should('exist');
  });

  it('renders list items with proper structure', () => {
    cy.mount(
      <CollapsibleList open={true} visibleCount={1}>
        <CollapsibleList.Item>Test Item</CollapsibleList.Item>
      </CollapsibleList>,
    );

    cy.get('ul.tyk-collapsible-list__list').should('exist');
    cy.get('.tyk-collapsible-list__item').should('exist');
    cy.get('.tyk-collapsible-list__item').should('match', 'li');
  });
});
