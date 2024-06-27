import React from 'react';
import Icon from './index';

describe('Icon', () => {
  const faFamily = 'fa-regular';
  const faFamilySolid = 'fa-solid';
  const tykonFamily = 'tykon';
  const selectors = {
    icon: '.tyk-icon',
  };

  it('renders an icon and the default family is "fa-regular"', () => {
    cy.mount(<Icon type="edit" />)
      .get(selectors.icon)
      .should('exist')
      .and('have.class', faFamily);
  });

  it('renders an icon and weight for fontawesome icons can be set', () => {
    cy.mount(<Icon type="edit" weight="solid" />)
      .get(selectors.icon)
      .should('exist')
      .and('have.class', faFamilySolid);
  });

  it('a different icon family can be specified', () => {
    cy.mount(<Icon family="tykon" type="edit" />)
      .get(selectors.icon)
      .should('have.class', tykonFamily);
  });

  it('the icon is determined by the family and the type by constructing a class', () => {
    const family = 'foo';
    const type = 'bar';
    cy.mount(<Icon family={family} type={type} />)
      .get(selectors.icon)
      .should('have.class', `${family}-${type}`);
  });

  it('we can add custom classes', () => {
    const myClass = 'foo';
    cy.mount(<Icon type="edit" className={myClass} />)
      .get(selectors.icon)
      .should('have.class', myClass);
  });

  it('other props will be added as attributes on the icon', () => {
    cy.mount(<Icon type="edit" data-foo="bar" />)
      .get(selectors.icon)
      .should('have.attr', 'data-foo', 'bar');
  });
});
