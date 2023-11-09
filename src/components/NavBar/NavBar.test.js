import React from 'react';
import NavBar from './index';

describe('NavBar', () => {
  const classes = {
    tabs: 'tyk-nav-bar__with-tabs',
    alignCenter: 'tyk-nav-bar--align-center',
    alignTop: 'tyk-nav-bar--align-top',
  };
  const selectors = {
    navbar: '.tyk-nav-bar',
    wrapper: '.tyk-nav-bar__wrapper',
    container: '.tyk-nav-bar__container',
    pre: '.tyk-nav-bar__pre',
    title: '.tyk-nav-bar__wrapper h1',
    subtitle: '.tyk-nav-bar__wrapper p',
    containerLeft: '.tyk-nav-bar__left',
    containerRight: '.tyk-nav-bar__right',
  };

  it('renders the component, a wrapper, and a container', () => {
    cy.mount(<NavBar />)
      .get(selectors.navbar)
      .should('exist')
      .get(selectors.wrapper)
      .should('exist')
      .get(selectors.container)
      .should('exist');
  });

  it('adds the tabs class if withTabs prop is used', () => {
    cy.mount(<NavBar withTabs />)
      .get(selectors.navbar)
      .should('have.class', classes.tabs);
  });

  it('the wrapper can be aligned with the "align" prop, "center" by default', () => {
    cy.mount(<NavBar />)
      .get(selectors.wrapper)
      .should('have.class', classes.alignCenter);

    cy.mount(<NavBar align="top" />)
      .get(selectors.wrapper)
      .should('have.class', classes.alignTop);
  });

  it('prepends content if "pre" prop is used', () => {
    const pre = 'something';
    cy.mount(<NavBar pre={pre} />)
      .get(selectors.pre)
      .should('exist')
      .and('have.text', pre);
  });

  it('can render a title', () => {
    const title = 'my title';
    cy.mount(<NavBar title={title} />)
      .get(selectors.title)
      .should('exist')
      .and('have.text', title);
  });

  it('can render a subtitle', () => {
    const subtitle = 'my subtitle';
    cy.mount(<NavBar subtitle={subtitle} />)
      .get(selectors.subtitle)
      .should('exist')
      .and('have.text', subtitle);
  });

  it('can render content on the left side of the container', () => {
    const content = 'my content';
    cy.mount(<NavBar left={content} />)
      .get(selectors.containerLeft)
      .should('exist')
      .and('have.text', content);
  });

  it('can render content on the right side of the container', () => {
    const content = 'my content';
    cy.mount(<NavBar right={content} />)
      .get(selectors.containerRight)
      .should('exist')
      .and('have.text', content);
  });

  it('can have children', () => {
    const content = 'component content';
    cy.mount(<NavBar>{content}</NavBar>)
      .get(selectors.navbar)
      .and('have.text', content);
  });
});
