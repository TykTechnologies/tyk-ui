import React from 'react';

import CopyToClipboard from './index';

describe('CopyToClipboard', () => {
  const content = 'The Content';
  const textToCopy = 'this is copied';

  it('renders the component with the content', () => {
    cy
      .mount(
        <CopyToClipboard element="span" copy={textToCopy}>
          <h1>{content}</h1>
        </CopyToClipboard>,
      )
      .get('h1')
      .contains(content)
      .should('exist');
  });

  it('accepts a prop called "copy" that represents the text copied to the clipboard', () => {
    cy
      .mount(
        <CopyToClipboard element="span" copy={textToCopy}>
          <h1 tabIndex="0">{content}</h1>
        </CopyToClipboard>,
      )
      .get('h1')
      .focus()
      .realClick()
      .then(() => {
        cy.window()
          .its('navigator.clipboard')
          .invoke('readText')
          .should('equal', textToCopy);
      });
  });

  it('can use the "display" prop to render content', () => {
    cy
      .mount(<CopyToClipboard element="span" display={content} copy={textToCopy} />)
      .get('span')
      .contains(content)
      .should('exist');
  });

  it('can specify a different element to wrap the content', () => {
    cy
      .mount(<CopyToClipboard element="p" display={content} copy={textToCopy} />)
      .get('p')
      .contains(content)
      .should('exist');
  });

  it('calls the onCopy callback when copying', () => {
    const onCopy = cy.stub();
    cy
      .mount(
        <CopyToClipboard element="span" copy={textToCopy} onCopy={onCopy}>
          <h1 tabIndex="0">{content}</h1>
        </CopyToClipboard>,
      )
      .get('h1')
      .focus()
      .realClick()
      .then(() => {
        expect(onCopy).to.be.called;
      });
  });
});
