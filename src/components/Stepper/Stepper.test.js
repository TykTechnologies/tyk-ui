import React from 'react';
import Stepper from './index';

/* eslint-disable-next-line react/prop-types */

function StepperComponent({ 
  validator, 
  onFinish: mockOnFinish,
  orientation = 'vertical'
}) {
  const onFinish = () => {
    console.log('Stepper finished');
  };

  const stepValidator = (stepId) => {
    return stepId !== 'step2';
  };

  return (
    <div className="stepper-wrapper">
      <Stepper
        onFinish={mockOnFinish || onFinish}
        stepValidator={validator || stepValidator}
        stepErrMessage="Validation failed"
        orientation={orientation}
      >
        <Stepper.Step id="step1" title="Step 1" description="First step">
          Step 1 content
        </Stepper.Step>
        <Stepper.Step id="step2" title="Step 2" description="Second step">
          Step 2 content
        </Stepper.Step>
        <Stepper.Step id="step3" title="Step 3" description="Third step">
          Step 3 content
        </Stepper.Step>
      </Stepper>
    </div>
  );
}

describe('Stepper Component', () => {
  describe('Common Functionality', () => {
    it('should render the initial step correctly', () => {
      cy.mount(<StepperComponent />)
        .get('.step-container-vertical')
        .should('have.length', 3)
        .get('.step-number.active')
        .should('contain', '1')
        .get('.step-title')
        .first()
        .should('have.text', 'Step 1');
    });

    it('should navigate to the next step when Continue is clicked', () => {
      cy.mount(<StepperComponent />)
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.step-number.active')
        .should('contain', '2');
    });

    it('should show error message when validation fails', () => {
      cy.mount(<StepperComponent />)
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.error-message')
        .should('be.visible')
        .and('have.text', 'Validation failed');
    });

    it('should allow navigation back to previous step', () => {
      cy.mount(<StepperComponent />)
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.stepper-buttons button')
        .contains('Back')
        .click()
        .get('.step-number.active')
        .should('contain', '1');
    });

    it('should show Finish button on last step and call onFinish', () => {
      const onFinish = cy.stub().as('onFinish');
      cy.mount(<StepperComponent validator={() => true} onFinish={onFinish} />)
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.stepper-buttons button')
        .contains('Finish')
        .should('be.visible')
        .click()
        .get('@onFinish')
        .should('have.been.called');
    });
  });

  describe('Vertical Orientation', () => {

    it('should show green connecting line for completed steps', () => {
      cy.mount(<StepperComponent orientation="vertical" validator={() => true} />)
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.step-container-vertical.completed')
        .should('exist');
    });
  });

  describe('Horizontal Orientation', () => {
    it('should render in horizontal layout', () => {
      cy.mount(<StepperComponent orientation="horizontal" />)
        .get('.step-list-horizontal')
        .should('exist')
    });

    it('should show progress line below step numbers', () => {
      cy.mount(<StepperComponent orientation="horizontal" />)
        .get('.progress-line-placeholder')
        .should('exist')
        .get('.progress-line')
        .should('not.exist');
    });

    it('should show completed progress line for finished steps', () => {
      cy.mount(<StepperComponent orientation="horizontal" validator={() => true} />)
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.progress-line')
        .should('exist');
    });

    it('should render active step content in content area', () => {
      cy.mount(<StepperComponent orientation="horizontal" />)
        .get('.stepper-content-wrapper')
        .should('contain', 'Step 1 content')
        .get('.stepper-buttons button')
        .contains('Continue')
        .click()
        .get('.stepper-content-wrapper')
        .should('contain', 'Step 2 content');
    });
  });

});