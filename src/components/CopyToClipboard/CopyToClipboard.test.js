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
});
