/* eslint-disable react/prop-types, react/jsx-no-constructed-context-values */
import React from 'react';

import Confirm from './index';

function Component({
  title = 'Console log',
  description = 'Are u sure u want to console log?',
  confirmBtnText = 'Confirm',
  cancelBtnText = 'Cancel',
  confirmCallback = () => {},
  cancelCallback = () => {},
  beforeCallback = () => {},
}) {
  return (
    <Confirm
      title={title}
      description={description}
      confirmBtnText={confirmBtnText}
      cancelBtnText={cancelBtnText}
    >
      {
        (confirm) => (
          <button
            id="content-button"
            type="button"
            onClick={confirm(confirmCallback, cancelCallback, beforeCallback)}
          >
            Confirm console log
          </button>
        )
      }
    </Confirm>
  );
}

describe('Confirm', () => {
  const selectors = {
    contentButton: '#content-button',
    modalBackdrop: '.tyk-modal__backdrop',
  };

  it('renders a modal when the provided "confirm" function is invoked', () => {
    cy
      .mount(<Component />)
      .get(selectors.modalBackdrop)
      .should('not.have.class', 'opened')
      .get(selectors.contentButton)
      .click();

    cy.get(selectors.modalBackdrop)
      .should('have.class', 'opened');
  });

  it('can receive as props a title, description and button texts', () => {
    const title = 'Custom Title';
    const description = 'Custom description';
    const confirmBtnText = 'Custom Confirm';
    const cancelBtnText = 'Custom Cancel';

    cy
      .mount(
        <Component
          title={title}
          description={description}
          confirmBtnText={confirmBtnText}
          cancelBtnText={cancelBtnText}
        />,
      )
      .get('*')
      .contains(title)
      .should('exist')
      .get('*')
      .contains(description)
      .should('exist')
      .get('*')
      .contains(confirmBtnText)
      .should('exist')
      .get('*')
      .contains(cancelBtnText)
      .should('exist');
  });

  it('calls the confirmCallback when clicking on the confirm button', () => {
    const confirmBtnText = 'Custom Confirm';
    const confirmCallback = cy.stub().as('confirmCallback');

    cy
      .mount(<Component confirmBtnText={confirmBtnText} confirmCallback={confirmCallback} />)
      .get(selectors.contentButton)
      .click();

    cy.get('button')
      .contains(confirmBtnText)
      .click();

    cy.get('@confirmCallback')
      .should('be.called');
  });

  it('calls the cancelCallback when clicking on the confirm button', () => {
    const cancelBtnText = 'Custom Cancel';
    const cancelCallback = cy.stub().as('cancelCallback');

    cy
      .mount(<Component cancelBtnText={cancelBtnText} cancelCallback={cancelCallback} />)
      .get(selectors.contentButton)
      .click();

    cy.get('button')
      .contains(cancelBtnText)
      .click();

    cy.get('@cancelCallback')
      .should('be.called');
  });

  it('calls the beforeCallback when showing the modal', () => {
    const beforeCallback = cy.stub().as('beforeCallback');

    cy
      .mount(<Component beforeCallback={beforeCallback} />)
      .get(selectors.contentButton)
      .click();

    cy.get('@beforeCallback')
      .should('be.called');
  });
});
