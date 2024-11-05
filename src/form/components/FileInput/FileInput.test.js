import React, { useState } from 'react';
import FileInput from './index';

describe('FileInput', () => {
  it('sets classes', () => {
    cy.mount(
      <FileInput
        theme="default rounded-corners"
        value={null}
        wrapperClassName="myclass"
      />,
    );

    cy.get('.myclass')
      .should('exist')
      .and('have.class', 'tyk-form-group--default')
      .and('have.class', 'tyk-form-group--rounded-corners');
  });

  it('displays the label with the correct width', () => {
    cy.mount(
      <FileInput
        theme="default inline rounded-corners"
        label="my label"
        labelwidth="200px"
      />,
    );

    cy.get('label')
      .should('have.text', 'my label')
      .and('have.css', 'width', '200px');
  });

  it('displays errors and notes', () => {
    cy.mount(
      <FileInput
        theme="default rounded-corners"
        error="Something wrong"
        note="This is important to know."
      />,
    );

    cy.get('.tyk-form-group')
      .should('have.class', 'has-error');
    cy.get('.tyk-form-control__help-block')
      .should('have.text', 'This is important to know.');
    cy.get('.tyk-form-control__error-message')
      .should('have.text', 'Something wrong');
  });

  it('calls onChange callback with the current value and clears the value when clicking the clear value button', () => {
    const onChange = cy.stub().as('onChange');
    const file = {
      contents: Cypress.Buffer.from('file contents'),
      fileName: 'file.txt',
      mimeType: 'text/plain',
      lastModified: Date.now(),
    };

    // eslint-disable-next-line react/prop-types
    function Component({ onChangeCallback }) {
      const [, setFiles] = useState(null);

      function onComponentChange(value) {
        setFiles(value);
        if (onChangeCallback) onChangeCallback(value);
      }
      return (
        <FileInput
          onChange={onComponentChange}
        />
      );
    }

    cy.mount(<Component onChangeCallback={onChange} />);

    cy.get('input')
      .selectFile(file, { force: true });

    cy.get('@onChange')
      .should('be.calledWithMatch', Cypress.sinon.match((x) => x instanceof FileList && x[0].name === 'file.txt'));

    cy.get('button')
      .click();
    cy.get('@onChange')
      .should('be.calledWith', '');
  });
});
