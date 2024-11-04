import React from 'react';
import Modal from './index';

function Component(props) {
  return (
    <Modal {...props}>
      {/* eslint-disable-next-line react/prop-types, react/destructuring-assignment */}
      {props.children || (
        <>
          <Modal.Body>Demo</Modal.Body>
          <Modal.Footer>modal footer</Modal.Footer>
        </>
      )}
    </Modal>
  );
}

describe('Modal', () => {
  const cssClasses = {
    tykModal: 'tyk-modal',
    opened: 'opened',
    themeDefault: 'tyk-modal--theme-default',
    modalDialog: 'tyk-modal__dialog',
    themeSuccess: 'tyk-modal--theme-success',
    backDrop: 'tyk-modal__backdrop',
    widthMd: 'tyk-modal--md',
    widthLg: 'tyk-modal--lg',
  };

  const selectors = {
    tykModal: `.${cssClasses.tykModal}`,
    modalDialog: `.${cssClasses.modalDialog}`,
    backDrop: `.${cssClasses.backDrop}`,
  };

  it('render the modal when opened prop exists or set to true', () => {
    cy.mount(<Component opened />)
      .get(selectors.tykModal)
      .should('exist')
      .and('have.class', cssClasses.tykModal)
      .and('have.class', cssClasses.opened)
      .and('have.class', cssClasses.themeDefault);
  });

  it('the modal is not rendered when opened is set to false ', () => {
    cy.mount(<Component />)
      .get(selectors.tykModal)
      .and('not.have.class', cssClasses.opened)
      .find(selectors.modalDialog)
      .should('exist')
      .and('not.be.visible');
  });

  it('should add custom class', () => {
    cy.mount(<Component className="custom-class" />)
      .get(selectors.tykModal)
      .should('exist')
      .and('have.class', 'custom-class');
  });

  it('should add theme class when theme option is present', () => {
    cy.mount(<Component opened theme="success" />)
      .get(selectors.tykModal)
      .should('exist')
      .and('have.class', cssClasses.themeSuccess);
  });

  it('should call onClose when back drop is clicked', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(<Component opened onClose={onClose} />)
      .get(selectors.backDrop)
      .should('exist')
      .and('have.class', cssClasses.opened)
      .and('have.class', cssClasses.backDrop);

    cy.get(selectors.backDrop)
      .click({ force: true });

    cy.get('@onClose')
      .should('be.called');
  });

  it('should not call onClose with disableCloseCommands', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(<Component opened disableCloseCommands onClose={onClose} />)
      .get(selectors.backDrop)
      .should('exist')
      .and('have.class', cssClasses.opened)
      .and('have.class', cssClasses.backDrop);

    cy.get(selectors.backDrop)
      .click({ force: true });

    cy.get('@onClose')
      .should('not.be.called');
    cy
      .get(selectors.backDrop)
      .should('exist')
      .and('have.class', cssClasses.opened);
  });

  it('should not display when showBackdrop is set to false', () => {
    cy.mount(<Component opened showBackdrop={false} theme="success" />)
      .get(selectors.backDrop)
      .should('not.exist');
  });

  it('should set width to md when size is set to md', () => {
    cy.mount(<Component opened size="md" showBackdrop={false} theme="success" />)
      .get(selectors.modalDialog)
      .should('exist')
      .and('have.class', cssClasses.widthMd);
  });

  it('should set width to lg when size is set to lg', () => {
    cy.mount(<Component opened size="lg" showBackdrop={false} theme="success" />)
      .get(selectors.modalDialog)
      .should('exist')
      .and('have.class', cssClasses.widthLg);
  });
});
