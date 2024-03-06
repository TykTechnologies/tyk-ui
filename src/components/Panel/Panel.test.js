import React from 'react';
import PropTypes from 'prop-types';
import Panel from './index';

function Component(props) {
  return (
    <Panel {...props}>
      {/* eslint-disable-next-line react/prop-types, react/destructuring-assignment */}
      {props.children || (
        <>
          <Panel.Header>Header</Panel.Header>
          <Panel.Body>Body</Panel.Body>
          <Panel.Footer>Footer</Panel.Footer>
        </>
      )}
    </Panel>
  );
}

Component.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

describe('Panel', () => {
  const cssClasses = {
    panel: 'tyk-panel',
    header: 'tyk-panel__header',
    body: 'tyk-panel__body',
    footer: 'tyk-panel__footer',
    collapsed: 'tyk-panel--collapsed',
    collapsable: 'collapsable',
    collapsableArrowLeft: 'collapsable__arrow-left',
    collapsableArrowRight: 'collapsable__arrow-right',
    downArrowIcon: 'fa-chevron-down',
    upArrowIcon: 'fa-chevron-up',
    theme: {
      success: 'tyk-panel--success',
      danger: 'tyk-panel--danger',
      warning: 'tyk-panel--warning',
    },
  };

  const selectors = {
    panel: `.${cssClasses.panel}`,
    header: `.${cssClasses.header}`,
    body: `.${cssClasses.body}`,
    footer: `.${cssClasses.footer}`,
    collapsableArrowLeft: `.${cssClasses.collapsableArrowLeft}`,
    collapsableArrowRight: `.${cssClasses.collapsableArrowRight}`,
    downArrowIcon: `.${cssClasses.downArrowIcon}`,
    upArrowIcon: `.${cssClasses.upArrowIcon}`,
  };

  it('should render the panel', () => {
    cy.mount(<Component />)
      .get(selectors.panel)
      .should('exist')
      .and('have.class', cssClasses.panel)
      .as('panel');

    cy.get('@panel')
      .find(selectors.header)
      .should('exist');

    cy.get('@panel')
      .find(selectors.body)
      .should('exist');

    cy.get('@panel')
      .find(selectors.footer)
      .should('exist');
  });

  it('should render with customClassName', () => {
    const customClass = 'panel-custom-class';
    cy.mount(<Component className={customClass} />)
      .get(selectors.panel)
      .should('exist')
      .and('have.class', cssClasses.panel)
      .and('have.class', customClass);
  });

  it('should be collapsable when collapsable prop is set', () => {
    cy.mount(<Component collapsable />)
      .get(selectors.header)
      .should('exist')
      .and('have.class', cssClasses.collapsable);
  });

  it('should be collapsed when header is clicked', () => {
    cy.mount(<Component collapsable />)
      .get(selectors.panel)
      .as('panel');

    cy.get('@panel')
      .find(selectors.header)
      .click();

    cy.get(selectors.panel)
      .should('have.class', cssClasses.collapsed);
  });

  it('should start with collapsed state when "collapsed" is set', () => {
    cy.mount(<Component collapsable collapsed />)
      .get(selectors.panel)
      .should('have.class', cssClasses.collapsed);
  });

  it('should show icon on the left when collapsibleIconPosition is set to left', () => {
    cy.mount(<Component collapsable collapsibleIconPosition="left" />)
      .get(selectors.header)
      .find(selectors.collapsableArrowLeft)
      .should('have.class', cssClasses.collapsableArrowLeft);
  });

  it('should show icon on the right when collapsibleIconPosition is set to right', () => {
    cy.mount(<Component collapsable collapsibleIconPosition="right" />)
      .get(selectors.header)
      .find(selectors.collapsableArrowRight)
      .should('have.class', cssClasses.collapsableArrowRight);
  });

  it('should have an icon down arrow when it is collapsed', () => {
    cy.mount(<Component collapsable collapsed collapsibleIconPosition="left" />)
      .get(selectors.collapsableArrowLeft)
      .find(selectors.downArrowIcon)
      .should('exist');
  });

  it('should have an icon up arrow when it is not collapsed', () => {
    cy.mount(<Component collapsable collapsibleIconPosition="right" />)
      .get(selectors.collapsableArrowRight)
      .find(selectors.upArrowIcon)
      .should('exist');
  });

  it('should toggle between up arrow and down arrow when collapsed state is changed', () => {
    cy.mount(<Component collapsable collapsibleIconPosition="right" />)
      .get(selectors.header)
      .find(selectors.upArrowIcon)
      .should('exist')
      .click();

    cy.get(selectors.header)
      .find(selectors.downArrowIcon)
      .should('exist');
  });

  it('should call onToggleCollapse when collapsed state is change', () => {
    const onCollapsed = cy.stub().as('onCollapsed');

    cy.mount(<Component onToggleCollapse={onCollapsed} collapsable collapsibleIconPosition="right" />)
      .get(selectors.header)
      .as('header')
      .click();

    cy.get('@onCollapsed')
      .should('be.calledWith', true);

    cy.get('@header')
      .click();

    cy.get('@onCollapsed')
      .should('be.calledWith', false);
  });

  it('should call set theme to success with theme="success"', () => {
    cy.mount(<Component theme="success" />)
      .get(selectors.panel)
      .should('have.class', cssClasses.theme.success);
  });

  it('should call set theme to danger with theme="danger"', () => {
    cy.mount(<Component theme="danger" />)
      .get(selectors.panel)
      .should('have.class', cssClasses.theme.danger);
  });

  it('should call set theme to warning with theme="warning"', () => {
    cy.mount(<Component theme="warning" />)
      .get(selectors.panel)
      .should('have.class', cssClasses.theme.warning);
  });
});
