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
    cy.mount(<Component className="custom-class">Demo</Component>)
      .get(selectors.tykModal)
      .should('exist')
      .and('have.class', 'custom-class');
  });

  it('should add theme class when theme option is present', () => {
    cy.mount(<Component opened theme="success">Demo</Component>)
      .get(selectors.tykModal)
      .should('exist')
      .and('have.class', cssClasses.themeSuccess);
  });

  it.skip('should close when back drop is clicked', () => {
    cy.mount(<Component opened theme="success">Demo</Component>)
      .get(selectors.backDrop)
      .should('exist')
      .and('have.class', cssClasses.opened)
      .and('have.class', cssClasses.backDrop);

    cy.get(selectors.backDrop).click();
    cy
      .get(selectors.backDrop)
      .should('exist')
      .and('have.not.class', cssClasses.opened);
  });

  it.skip('should not close the backdrop on click with disableCloseCommands', () => {
    cy.mount(<Component opened theme="success">Demo</Component>)
      .get(selectors.backDrop)
      .should('exist')
      .and('have.class', cssClasses.opened)
      .and('have.class', cssClasses.backDrop);

    cy.get(selectors.backDrop).click();
    cy
      .get(selectors.backDrop)
      .should('exist')
      .and('have.class', cssClasses.opened);
  });

  it.skip('should call onclose when dialog closed', () => {
    const onCloseSpy = cy.spy();

    cy.mount(<Component opened onClose={onCloseSpy} theme="success">Demo</Component>)
      .get(selectors.backDrop)
      .should('exist')
      .and('have.class', cssClasses.opened)
      .and('have.class', cssClasses.backDrop);

    cy.get(selectors.backDrop).click();
    cy
      .get(selectors.backDrop)
      .should('exist')
      .and('have.not.class', cssClasses.opened);

    onCloseSpy.should('be.called');
  });

  it('should not display when showBackdrop is set to false', () => {
    cy.mount(<Component opened showBackdrop={false} theme="success">Demo</Component>)
      .get(selectors.backDrop)
      .should('not.exist');
  });

  it('should set width to md when size is set to md', () => {
    cy.mount(<Component opened size="md" showBackdrop={false} theme="success">Demo</Component>)
      .get(selectors.modalDialog)
      .should('exist')
      .and('have.class', cssClasses.widthMd);
  });

  it('should set width to lg when size is set to lg', () => {
    cy.mount(<Component opened size="lg" showBackdrop={false} theme="success">Demo</Component>)
      .get(selectors.modalDialog)
      .should('exist')
      .and('have.class', cssClasses.widthLg);
  });
});
