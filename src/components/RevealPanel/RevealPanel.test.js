/* eslint-disable react/prop-types, react/jsx-no-constructed-context-values */
import React from 'react';
import RevealPanel from './index';

function Component() {
  return (
    <div className="demo" style={{ position: 'relative' }}>
      e and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also
      <RevealPanel height="50%">
        Panel content to make a type specimen book.
      </RevealPanel>
    </div>
  );
}

describe('RevealPanel.test.js', () => {
  it('renders RevealPanel component', () => {
    cy.mount(<Component />);
  });
});
