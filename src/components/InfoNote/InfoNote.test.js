import React from 'react';
import InfoNote from './index';

describe('InfoNote', () => {
  const selectors = {
    message: '.tyk-message',
  };

  it('renders a Message component with the info theme', () => {
    const content = 'The Content';
    cy
      .mount(
        <InfoNote className="foo bar">
          {content}
        </InfoNote>,
      )
      .get(selectors.message)
      .should('have.class', 'tyk-message--info')
      .and('have.text', content);
  });
});
