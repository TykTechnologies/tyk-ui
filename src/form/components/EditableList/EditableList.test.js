import React, { useMemo, useState } from 'react';
import Input from '../Input';
import EditableList from './index';

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

const selectors = {
  input: '.tyk-editable-list__form input',
  addButton: '.tyk-editable-list__submit-btn',
  mainError: '.tyk-editable-list-main-error',
  listItem: '.tyk-editable-list-item__text',
};

describe('EditableList', () => {
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
    cy.get(selectors.listItem).should('have.length', 2).last().should('contain', '/other');
  });
});
