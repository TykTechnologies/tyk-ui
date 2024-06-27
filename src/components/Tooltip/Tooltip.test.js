import React from 'react';
import Icon from '../Icon';
import Tooltip from './index';

describe('Tooltip', () => {
  const classes = {
    floatingContainer: 'floating-container',
    tooltipWrapper: 'tyk-tooltip__wrapper',
    tooltip: 'tyk-tooltip',
    content: 'tooltip-content',
    iconHelp: 'fa-question',
    iconClose: 'fa-xmark',
  };
  function Component(props) {
    return (
      <div style={{ marginTop: '200px', textAlign: 'center' }}>
        <Tooltip {...props}>
          <span className="tooltip-content">Hover Over Me 1</span>
        </Tooltip>
      </div>
    );
  }

  it('basics: render, className, style', () => {
    const customClass = 'my-tooltip';
    cy.mount(<Component render="hello!" className={customClass} style={{ border: '1px solid rgb(255, 0, 0)' }} />);

    cy.get(`.${classes.floatingContainer}`)
      .should('not.exist')
      .get(`.${classes.content}`)
      .trigger('mouseover');

    cy.get(`.${classes.floatingContainer}`)
      .should('exist')
      .get(`.${classes.tooltip}`)
      .should('have.class', customClass)
      .get(`.${classes.tooltipWrapper}`)
      .should('have.css', 'border', '1px solid rgb(255, 0, 0)')
      .find(`.${classes.content}`)
      .should('exist');
  });

  it('can be positioned top, bottom, left, right', () => {
    function getContentOffset(dim) {
      cy.get(`.${classes.content}`)
        .trigger('mouseover');

      return cy // eslint-disable-line cypress/no-unnecessary-waiting
        .get(`.${classes.floatingContainer}`)
        .wait(500)
        .invoke('offset')
        .its(dim);
    }

    function assertWrapper(dim, compare, val) {
      cy.get(`.${classes.tooltipWrapper}`)
        .invoke('offset')
        .its(dim)
        .should(`be.${compare}`, val);
    }

    cy.mount(<Component render="hello!" position="top" />);
    getContentOffset('top')
      .then((contentTop) => assertWrapper('top', 'gt', contentTop));

    cy.mount(<Component render="hello!" position="bottom" />);
    getContentOffset('top')
      .then((contentTop) => assertWrapper('top', 'lt', contentTop));

    cy.mount(<Component render="hello!" position="left" />);
    getContentOffset('left')
      .then((contentLeft) => assertWrapper('left', 'gt', contentLeft));

    cy.mount(<Component render="hello!" position="right" />);
    getContentOffset('left')
      .then((contentLeft) => assertWrapper('left', 'lt', contentLeft));
  });

  it('can display a "help" icon or a custom icon', () => {
    cy.mount(<Component render="hello" icon />);
    cy.get(`.${classes.content}`)
      .trigger('mouseover');

    cy.get(`.${classes.tooltip}`)
      .find(`.${classes.iconHelp}`)
      .should('exist');

    cy.mount(<Component render="hello" icon={<Icon type="check" />} />);
    cy.get(`.${classes.content}`)
      .trigger('mouseover');

    cy.get(`.${classes.tooltip} .${classes.iconHelp}`)
      .should('not.exist')
      .get(`.${classes.tooltip} .fa-check`)
      .should('exist');
  });

  it('can be triggered by clicking', () => {
    cy.mount(<Component render="hello" closable />);
    cy.get(`.${classes.content}`)
      .click();

    cy.get(`.${classes.tooltip}`)
      .should('exist')
      .get(`.${classes.iconClose}`)
      .click();

    cy.get(`.${classes.tooltip}`)
      .should('not.exist');
  });

  it('can be opened programatically with the prop "isOpened"', () => {
    cy.mount(<Component render="hello" isOpened />);
    cy.get(`.${classes.tooltip}`)
      .should('exist');
  });
});
