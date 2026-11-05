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

function valueColumn(rowIndex) {
  return cy.get(selectors.itemText).eq(rowIndex).find(selectors.column).eq(1);
}

describe('EditableList', () => {
  it('displays number values, including zero', () => {
    mountWithValues([
      ['token_expiration', 1700000000],
      ['retries', 0],
    ]);

    valueColumn(0).should('have.text', '1700000000');
    valueColumn(1).should('have.text', '0');
  });

  it('displays boolean values, including false', () => {
    mountWithValues([
      ['is_admin', true],
      ['is_locked', false],
    ]);

    valueColumn(0).should('have.text', 'true');
    valueColumn(1).should('have.text', 'false');
  });

  it('keeps displaying strings, objects and dates as before', () => {
    mountWithValues([
      ['user_id', 'alex'],
      ['plan', { id: 'gold', name: 'Gold plan' }],
      ['created', new Date(2026, 10, 4)],
    ]);

    valueColumn(0).should('have.text', 'alex');
    valueColumn(1).should('have.text', 'Gold plan');
    valueColumn(2).should('have.text', '04/11/2026');
  });

  it('displays number and boolean values in inline mode', () => {
    mountWithValues([
      ['token_expiration', 1700000000],
      ['is_locked', false],
    ], { displayType: 'inline' });

    cy.get(selectors.itemText).eq(0)
      .should('contain.text', 'token_expiration, 1700000000')
      .and('not.contain.text', 'null');
    cy.get(selectors.itemText).eq(1)
      .should('contain.text', 'is_locked, false')
      .and('not.contain.text', 'null');
  });
});
