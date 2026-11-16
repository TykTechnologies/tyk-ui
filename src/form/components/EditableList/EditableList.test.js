import React, { useMemo, useState } from 'react';
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
  input: '.tyk-editable-list__form input',
  addButton: '.tyk-editable-list__submit-btn',
  mainError: '.tyk-editable-list-main-error',
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

// Mirrors how the Dashboard uses EditableList: the parent controls the field
// value through the field's own onChange.
function ControlledList() {
  const [path, setPath] = useState('');
  const [list, setList] = useState([{ value: ['/test'] }]);

  const config = useMemo(() => ({
    components: [
      {
        name: Input,
        props: {
          name: 'path',
          label: 'Path',
          value: path,
          onChange: setPath,
        },
      },
    ],
  }), [path]);

  return (
    <EditableList
      config={config}
      value={list}
      onChange={(newList) => {
        setPath('');
        setList(newList);
      }}
    />
  );
}

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

  it('shows the duplicate error and disables ADD for a value already in the list', () => {
    cy.mount(<ControlledList />);

    cy.get(selectors.input).type('/test');
    cy.get(selectors.addButton).click();

    cy.get(selectors.mainError).should('contain', 'This value is already in the list');
    cy.get(selectors.addButton).should('be.disabled');
  });

  it('clears the duplicate error and re-enables ADD once a controlled field changes', () => {
    cy.mount(<ControlledList />);

    cy.get(selectors.input).type('/test');
    cy.get(selectors.addButton).click();
    cy.get(selectors.addButton).should('be.disabled');

    cy.get(selectors.input).clear().type('/other');

    cy.get(selectors.mainError).should('not.exist');
    cy.get(selectors.addButton).should('be.enabled').click();
    cy.get(selectors.itemText).should('have.length', 2).last().should('contain', '/other');
  });
});
