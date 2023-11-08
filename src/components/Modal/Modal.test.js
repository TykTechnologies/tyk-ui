import React from 'react';
import Modal from './index';

function Component({ children, ...props }) {
  return (
      <Modal {...props}>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
  );
}

describe('Modal', () => {
  const cssClasses = {
    tykModal: 'tyk-modal',
    opened: 'opened',
    themeNone: 'tyk-modal--theme-none',
    modalDialog: 'tyk-modal__dialog',
  };

  const selectors = {
    tykModal: `.${cssClasses.tykModal}`,
    modalDialog: `.${cssClasses.modalDialog}`,
  };

  it('render the modal when opened prop exists or set to true', () => {
    cy.mount(<Component opened>demo</Component>)
      .get(selectors.tykModal)
      .should('exist')
      .and('have.class', cssClasses.tykModal)
      .and('have.class', cssClasses.opened)
      .and('have.class', cssClasses.themeNone);
  });

  it('dont render the modal when opened is set to false ', () => {
    cy.mount(<Component>demo</Component>)
      .get(selectors.tykModal)
      .and('not.have.class', cssClasses.opened)
      .find(selectors.modalDialog)
      .should('exist')
      .and('have.css', 'opacity', '0');
  });

  it('should add custom class', () => {
    cy.mount(<Component className="custom-class">demo</Component>)
      .get(selectors.tykModal)
      .should('exist')
      .and('have.class', 'custom-class');
  });

  it.only('should add theme class when theme option is present', () => {
    cy.mount(<Component opened theme="success" size="md">
      <div style={{ padding: '30px' }}>demo</div>
    </Component>)
      .get(selectors.tykModal)
      .should('exist');
  });
});
