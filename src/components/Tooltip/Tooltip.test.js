import React from 'react';
import { mount } from '@cypress/react';
import '../../index.scss';
import Icon from '../Icon';
import Tooltip from './index';

describe('Tooltip', () => {
  const classes = {
    floatingContainer: 'floating-container',
    tooltipWrapper: 'tyk-tooltip__wrapper',
    tooltip: 'tyk-tooltip',
    content: 'tooltip-content',
    iconHelp: 'tykon-help',
    iconClose: 'tykon-x',
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
    mount(<Component render="hello!" className={customClass} style={{ border: '1px solid rgb(255, 0, 0)' }} />);

    cy.get(`.${classes.floatingContainer}`)
      .should('not.exist')
      .get(`.${classes.content}`)
      .trigger('mouseover')
      .get(`.${classes.floatingContainer}`)
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
      return cy.get(`.${classes.content}`) // eslint-disable-line cypress/no-unnecessary-waiting
        .trigger('mouseover')
        .get(`.${classes.floatingContainer}`)
        .wait(200)
        .invoke('offset')
        .its(dim);
    }

    function assertWrapper(dim, compare, val) {
      cy.get(`.${classes.tooltipWrapper}`)
        .invoke('offset')
        .its(dim)
        .should(`be.${compare}`, val);
    }

    mount(<Component render="hello!" position="top" />);
    getContentOffset('top')
      .then((contentTop) => assertWrapper('top', 'gt', contentTop));

    mount(<Component render="hello!" position="bottom" />);
    getContentOffset('top')
      .then((contentTop) => assertWrapper('top', 'lt', contentTop));

    mount(<Component render="hello!" position="left" />);
    getContentOffset('left')
      .then((contentLeft) => assertWrapper('left', 'gt', contentLeft));

    mount(<Component render="hello!" position="right" />);
    getContentOffset('left')
      .then((contentLeft) => assertWrapper('left', 'lt', contentLeft));
  });

  it('can display a "help" icon or a custom icon', () => {
    mount(<Component render="hello" icon />);
    cy.get(`.${classes.content}`)
      .trigger('mouseover')
      .get(`.${classes.tooltip}`)
      .find(`.${classes.iconHelp}`)
      .should('exist');

    mount(<Component render="hello" icon={<Icon family="tykon" type="check" />} />);
    cy.get(`.${classes.content}`)
      .trigger('mouseover')
      .get(`.${classes.tooltip} .${classes.iconHelp}`)
      .should('not.exist')
      .get(`.${classes.tooltip} .tykon-check`)
      .should('exist');
  });

  it('can be triggered by clicking', () => {
    mount(<Component render="hello" closable />);
    cy.get(`.${classes.content}`)
      .click()
      .get(`.${classes.tooltip}`)
      .should('exist')
      .get(`.${classes.iconClose}`)
      .click()
      .get(`.${classes.tooltip}`)
      .should('not.exist');
  });

  it('can be opened programatically with the prop "isOpened"', () => {
    mount(<Component render="hello" isOpened />);
    cy.get(`.${classes.tooltip}`)
      .should('exist');
  });
});
