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
};

function mountWithValues(rows) {
  cy.mount(
    <EditableList
      value={rows.map((row) => ({ value: row }))}
      config={config}
      onChange={() => {}}
    />,
  );
}

describe('EditableList', () => {
  it('displays number values, including zero', () => {
    mountWithValues([
      ['token_expiration', 1700000000],
      ['retries', 0],
    ]);

    cy.get(selectors.itemText).eq(0).should('contain.text', '1700000000');
    cy.get(selectors.itemText).eq(1).should('contain.text', '0');
  });

  it('displays boolean values, including false', () => {
    mountWithValues([
      ['is_admin', true],
      ['is_locked', false],
    ]);

    cy.get(selectors.itemText).eq(0).should('contain.text', 'true');
    cy.get(selectors.itemText).eq(1).should('contain.text', 'false');
  });

  it('keeps displaying strings, objects and dates as before', () => {
    mountWithValues([
      ['user_id', 'alex'],
      ['plan', { id: 'gold', name: 'Gold plan' }],
      ['created', new Date(2026, 10, 4)],
    ]);

    cy.get(selectors.itemText).eq(0).should('contain.text', 'alex');
    cy.get(selectors.itemText).eq(1).should('contain.text', 'Gold plan');
    cy.get(selectors.itemText).eq(2).should('contain.text', '04/11/2026');
  });
});
