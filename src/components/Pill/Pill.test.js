import React from 'react';
import PropTypes from 'prop-types';
import Pill from './index';

function Component(props) {
  return (
    <Pill {...props}>
      {/* eslint-disable-next-line react/prop-types, react/destructuring-assignment */}
      {props.children || (
        <div>Demo</div>
      )}
    </Pill>
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

describe('Pill', () => {
  const cssClasses = {
    pill: 'tyk-pill',
    square: 'tyk-pill--square',
    theme: {
      default: 'tyk-pill--default',
      primary: 'tyk-pill--primary',
      success: 'tyk-pill--success',
      danger: 'tyk-pill--danger',
      warning: 'tyk-pill--warning',
      info: 'tyk-pill--info',
    },
    outline: {
      default: 'tyk-pill--default-outline',
      primary: 'tyk-pill--primary-outline',
      success: 'tyk-pill--success-outline',
      danger: 'tyk-pill--danger-outline',
      warning: 'tyk-pill--warning-outline',
      info: 'tyk-pill--info-outline',
    },
  };

  const selectors = {
    pill: `.${cssClasses.pill}`,
  };

  it('should render pill component', () => {
    cy.mount(<Component />)
      .get(selectors.pill)
      .should('exist')
      .and('have.class', cssClasses.theme.default);
  });

  it('should render with custom class', () => {
    const customClassName = 'pill-custom-class';
    cy.mount(<Component className={customClassName} />)
      .get(selectors.pill)
      .should('exist')
      .and('have.class', customClassName);
  });

  it('should render with outline theme classes', () => {
    cy.wrap(Object.entries(cssClasses.outline)).each(([theme, themeClass]) => {
      cy.mount(<Component theme={`${theme}-outline`} />)
        .get(selectors.pill)
        .should('exist')
        .and('have.class', themeClass);
    });
  });

  it('should render with square theme classes', () => {
    cy.wrap(Object.entries(cssClasses.theme)).each(([theme, themeClass]) => {
      cy.mount(<Component theme={`${theme} square`} />)
        .get(selectors.pill)
        .should('exist')
        .and('have.class', themeClass)
        .and('have.class', cssClasses.square);
    });
  });

  it('should render with outline square theme classes', () => {
    cy.wrap(Object.entries(cssClasses.outline)).each(([theme, themeClass]) => {
      cy.mount(<Component theme={`${theme}-outline square`} />)
        .get(selectors.pill)
        .should('exist')
        .and('have.class', themeClass)
        .and('have.class', cssClasses.square);
    });
  });
});
