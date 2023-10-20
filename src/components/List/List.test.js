import React from 'react';
import List from './index';

describe('List', () => {
  it('test list is rendered with items in primary theme', () => {
    cy.mount(
      <List
        theme="primary-light"
        label="LABEL"
      >
        <List.Item>Alpha</List.Item>
        <List.Item>Bravo</List.Item>
        <List.Item>Charlie</List.Item>
        <List.Item>Delta</List.Item>
      </List>
    )
    
    cy.get('.tyk-list__wrapper')
      .get('ul')
      .should('have.class', 'tyk-list')

    cy.contains("LABEL").should('exist');
    cy.contains("Alpha").should('exist');
    cy.contains("Bravo").should('exist');
    cy.contains("Charlie").should('exist');
    cy.contains("Delta").should('exist');
  });
});