import React from 'react';
import CopyToClipboard from './index';
import Button from '../Button';

describe('CoopyToClipboard', () => {
  it('Test component rendering and Test copy functionality', () => {
    const textToCopy = 'boooo';
    const displayText = 'BUTTON_TEST_NAME';
    cy.mount(
      <div>
        <CopyToClipboard
          copy={textToCopy}
          display={displayText}
          theme="primary"
          element={Button}
          onCopy={() => {
            document.querySelector('.dummy').innerText = textToCopy;
          }}
        />
        <span className="dummy">PLACEHOLDER</span>
      </div>,
    );
    cy.get('span.dummy').invoke('text').should('eq', 'PLACEHOLDER');
    cy.contains(textToCopy).should('not.exist');
    cy.contains(displayText).should('exist').click();
    cy.get('span.dummy').invoke('text').should('eq', textToCopy);
  });

  it('copies once per click on a Button, not again for every key pressed while it has focus', () => {
    const onCopy = cy.stub().as('onCopy');
    cy.mount(
      <CopyToClipboard copy="boooo" display="COPY" element={Button} onCopy={onCopy} />,
    );

    cy.contains('COPY').click();
    cy.get('@onCopy').should('have.been.calledOnce');
    cy.focused().type('abc');
    cy.get('@onCopy').should('have.been.calledOnce');
  });

  it('copies on Enter and Space for an element that is not a button, and ignores other keys', () => {
    const onCopy = cy.stub().as('onCopy');
    cy.mount(
      <CopyToClipboard copy="boooo" display="COPY" element="span" tabIndex={0} onCopy={onCopy} />,
    );

    cy.contains('COPY').focus().type('a');
    cy.get('@onCopy').should('not.have.been.called');
    cy.focused().type('{enter}');
    cy.get('@onCopy').should('have.been.calledOnce');
    cy.focused().type(' ');
    cy.get('@onCopy').should('have.been.calledTwice');
  });
});
