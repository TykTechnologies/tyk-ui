import React from 'react';
import Input from '../Input';
import EditableList from './index';

const config = {
  components: [
    {
      size: 6,
      name: Input,
      props: {
        label: 'Key',
        name: 'key',
        type: 'text',
        value: '',
      },
    },
    {
      size: 6,
      name: Input,
      props: {
        label: 'Value',
        name: 'value',
        type: 'text',
        value: '',
      },
    },
  ],
};

const selectors = {
  itemText: '.tyk-editable-list-item__text',
  column: '.tyk-col',
};

function mountWithValues(rows, extraConfig = {}) {
  cy.mount(
    <EditableList
      value={rows.map((row) => ({ value: row }))}
      config={{ ...config, ...extraConfig }}
      onChange={() => {}}
    />,
  );
}

// 1700000000 is a Unix timestamp, the kind of value the customer stored in token_expiration.
const TIMESTAMP = 1700000000;

describe('EditableList', () => {
  it('displays number values, including zero', () => {
    mountWithValues([
      ['token_expiration', TIMESTAMP],
      ['retries', 0],
    ]);

    cy.get(selectors.itemText).eq(0).find(selectors.column).eq(1)
      .should('have.text', String(TIMESTAMP));
    cy.get(selectors.itemText).eq(1).find(selectors.column).eq(1)
      .should('have.text', '0');
  });

  it('displays boolean values, including false', () => {
    mountWithValues([
      ['is_admin', true],
      ['is_locked', false],
    ]);

    cy.get(selectors.itemText).eq(0).find(selectors.column).eq(1)
      .should('have.text', 'true');
    cy.get(selectors.itemText).eq(1).find(selectors.column).eq(1)
      .should('have.text', 'false');
  });

  it('keeps displaying strings, objects and dates as before', () => {
    mountWithValues([
      ['user_id', 'alex'],
      ['plan', { id: 'gold', name: 'Gold plan' }],
      // getItemListValue formats dates with the fixed pattern dd/MM/yyyy, not the locale.
      // A day over 12 makes the day and month order unambiguous.
      ['created', new Date(2026, 10, 25)],
    ]);

    cy.get(selectors.itemText).eq(0).find(selectors.column).eq(1)
      .should('have.text', 'alex');
    cy.get(selectors.itemText).eq(1).find(selectors.column).eq(1)
      .should('have.text', 'Gold plan');
    cy.get(selectors.itemText).eq(2).find(selectors.column).eq(1)
      .should('have.text', '25/11/2026');
  });

  it('displays number and boolean values in inline mode', () => {
    mountWithValues([
      ['token_expiration', TIMESTAMP],
      ['is_locked', false],
    ], { displayType: 'inline' });

    cy.get(selectors.itemText).eq(0)
      .should('contain.text', `token_expiration, ${TIMESTAMP}`)
      .and('not.contain.text', 'null');
    cy.get(selectors.itemText).eq(1)
      .should('contain.text', 'is_locked, false')
      .and('not.contain.text', 'null');
  });
});
