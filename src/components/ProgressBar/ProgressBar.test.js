import React from 'react';
import ProgressBar from './index';

describe('ProgressBar', () => {
  it('renders the component with proper classes and attributes based on props', () => {
    cy
      .mount(
        <ProgressBar
          value={50}
          max={100}
          theme="success"
          size="lg"
          className="custom-class"
          id="test-progress"
        />,
      )
      .get('.tyk-progress-bar')
      .should('have.class', 'tyk-progress-bar--success')
      .and('have.class', 'tyk-progress-bar--lg')
      .and('have.class', 'custom-class')
      .and('have.attr', 'id', 'test-progress');
  });

  it('calculates and displays the correct progress percentage', () => {
    cy
      .mount(
        <ProgressBar
          value={25}
          max={100}
        />,
      );
    
    cy.get('.tyk-progress-bar__progress')
      .should('have.attr', 'style')
      .and('include', 'width: 25%');
    
    cy.get('.tyk-progress-bar__progress')
      .should('have.attr', 'aria-valuenow', '25')
      .and('have.attr', 'aria-valuemin', '0')
      .and('have.attr', 'aria-valuemax', '100');
  });

  it('handles values greater than max by capping at 100%', () => {
    cy
      .mount(
        <ProgressBar
          value={150}
          max={100}
        />,
      );
    
    cy.get('.tyk-progress-bar__progress')
      .should('have.attr', 'style')
      .and('include', 'width: 100%');
  });

  it('handles negative values by setting to 0%', () => {
    cy
      .mount(
        <ProgressBar
          value={-10}
          max={100}
        />,
      );
    
    cy.get('.tyk-progress-bar__progress')
      .should('have.attr', 'style')
      .and('include', 'width: 0%');
  });

  it('displays the label when provided', () => {
    const label = 'Loading progress';
    cy
      .mount(
        <ProgressBar
          value={50}
          label={label}
        />,
      );
    
    cy.get('.tyk-progress-bar__label')
      .should('exist')
      .and('contain', label);
  });

  it('displays the percentage text when showPercentage is true', () => {
    cy
      .mount(
        <ProgressBar
          value={75}
          showPercentage={true}
        />,
      );
    
    cy.get('.tyk-progress-bar__percentage')
      .should('exist')
      .and('contain', '75%')
      .and('have.class', 'tyk-progress-bar__percentage--bottom');
  });

  it('displays the percentage text in the specified position', () => {
    cy
      .mount(
        <ProgressBar
          value={75}
          showPercentage={true}
          percentagePosition="top"
        />,
      );
    
    cy.get('.tyk-progress-bar__percentage')
      .should('exist')
      .and('have.class', 'tyk-progress-bar__percentage--top');
  });

  it('displays custom percentage text when percentageText is provided', () => {
    const customText = '{value}% completed';
    cy
      .mount(
        <ProgressBar
          value={75}
          showPercentage={true}
          percentageText={customText}
        />,
      );
    
    cy.get('.tyk-progress-bar__percentage')
      .should('exist')
      .and('contain', '75% completed');
  });

  it('does not display the percentage text when showPercentage is false', () => {
    cy
      .mount(
        <ProgressBar
          value={75}
          showPercentage={false}
        />,
      );
    
    cy.get('.tyk-progress-bar__percentage')
      .should('not.exist');
  });
});
