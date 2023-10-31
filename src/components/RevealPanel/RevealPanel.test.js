/* eslint-disable react/prop-types, react/jsx-no-constructed-context-values */
import React from 'react';
import RevealPanel from './index';

function Component() {
  return (
    <div className="demo" style={{ position: 'relative' }}>
      e and scrambled it to make a type specimen book.
      It has survived not only five centuries, but also
      the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the
      1960s with the release of Letraset sheets
      containing Lorem Ipsum passages,
      and more recently with desktop publishing software
      like Aldus PageMaker including verse and scrambled it
      to make a type specimen book. It has survived not only
      five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s
      with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker including vers
      <RevealPanel height="50%">
        Panel content to make a type specimen book.
        to make a type specimen book. It has survived not only
        five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s
        with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus PageMaker including vers

      </RevealPanel>
    </div>
  );
}

describe('RevealPanel.test.js', () => {
  it('renders RevealPanel component', () => {
    cy.mount(<Component />);
  });
});
