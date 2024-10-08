import React from "react";
import Stepper from "./index";

function StepperComponent({ validator, onFinish: mockOnFinish }) {
  const onFinish = () => {
    console.log("Stepper finished");
  };

  const stepValidator = (stepId) => {
    return stepId !== "step2";
  };

  return (
    <div className="stepper-wrapper">
      <Stepper
        onFinish={mockOnFinish || onFinish}
        stepValidator={validator || stepValidator}
        stepErrMessage="Validation failed"
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

describe("Stepper", () => {
  it("should render the initial step correctly", () => {
    cy.mount(<StepperComponent />)
      .get(".step-container")
      .should("have.length", 3)
      .get(".step-number.active")
      .should("contain", "1")
      .get(".step-title")
      .first()
      .should("have.text", "Step 1");
  });

  it("should navigate to the next step when Continue is clicked", () => {
    cy.mount(<StepperComponent />)
      .get(".stepper-buttons button")
      .contains("Continue")
      .click()
      .get(".step-number.active")
      .should("contain", "2");
  });

  it("should show error message when validation fails", () => {
    cy.mount(<StepperComponent />)
      .get(".stepper-buttons button")
      .contains("Continue")
      .click()
      .get(".stepper-buttons button")
      .contains("Continue")
      .click()
      .get(".error-message")
      .should("be.visible")
      .and("have.text", "Validation failed");
  });

  it("should allow navigation back to previous step", () => {
    cy.mount(<StepperComponent />)
      .get(".stepper-buttons button")
      .contains("Continue")
      .click()
      .get(".stepper-buttons button")
      .contains("Back")
      .click()
      .get(".step-number.active")
      .should("contain", "1");
  });

  it("should mark completed steps correctly", () => {
    cy.mount(<StepperComponent />)
      .get(".stepper-buttons button")
      .contains("Continue")
      .click()
      .get(".step-number.completed")
      .should("have.length", 1)
      .and("contain", "1");
  });

  it("should show Finish button on last step", () => {
    const onFinish = cy.stub().as("onFinish");
    cy.mount(<StepperComponent validator={() => true} onFinish={onFinish} />)
      .get(".stepper-buttons button")
      .contains("Continue")
      .click()
      .get(".stepper-buttons button")
      .contains("Continue")
      .click()
      .get(".stepper-buttons button")
      .contains("Finish")
      .should("be.visible")
      .click()
      .get('button:contains("Finish")')
      .click()
      .get("@onFinish")
      .should("have.been.called");
  });
});
