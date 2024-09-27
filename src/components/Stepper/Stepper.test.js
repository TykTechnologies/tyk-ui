import React from "react";
import Stepper from "./index";

describe("Stepper", () => {
  const steps = [
    {
      title: "Step 1",
      description: "Description 1",
      component: <div>Step 1 Content</div>,
    },
    {
      title: "Step 2",
      description: "Description 2",
      component: <div>Step 2 Content</div>,
    },
    {
      title: "Step 3",
      description: "Description 3",
      component: <div>Step 3 Content</div>,
    },
  ];

  const selectors = {
    stepperContainer: ".Stepper-container",
    stepsContainer: ".steps-container",
    step: ".step",
    activeStep: ".step.active",
    completedStep: ".step.completed",
    stepIndicator: ".step-indicator",
    stepNumber: ".step-number",
    stepLine: ".step-line",
    stepContent: ".step-content",
    stepComponent: ".step-component",
    navigationButtons: ".navigation-buttons",
    backButton: 'button:contains("Back")',
    continueButton: 'button:contains("Continue")',
    finishButton: 'button:contains("Finish")',
  };

  it("renders the component with the correct number of steps", () => {
    cy.mount(<Stepper steps={steps} />)
      .get(selectors.stepperContainer)
      .should("exist")
      .get(selectors.stepsContainer)
      .should("exist")
      .get(selectors.step)
      .should("have.length", steps.length);
  });

  it("displays the first step as active by default", () => {
    cy.mount(<Stepper steps={steps} />)
      .get(selectors.activeStep)
      .should("have.length", 1)
      .get(selectors.activeStep)
      .find("h3")
      .should("contain", steps[0].title);
  });

  it("starts with an initial step if specified", () => {
    const stepsWithInitial = [
      ...steps.slice(0, 2),
      { ...steps[2], isInitial: true },
    ];
    cy.mount(<Stepper steps={stepsWithInitial} />)
      .get(selectors.activeStep)
      .find("h3")
      .should("contain", steps[2].title);
  });

  it("does not show the Back button on the first step", () => {
    cy.mount(<Stepper steps={steps} />)
      .get(selectors.backButton)
      .should("not.exist");
  });

  it("moves to the next step when Continue is clicked", () => {
    cy.mount(<Stepper steps={steps} />)
      .get(selectors.continueButton)
      .click()
      .get(selectors.activeStep)
      .find("h3")
      .should("contain", steps[1].title)
      .get(selectors.completedStep)
      .should("have.length", 1);
  });

  it("moves to the previous step when Back is clicked", () => {
    cy.mount(<Stepper steps={steps} />)
      .get(selectors.continueButton)
      .click()
      .get(selectors.backButton)
      .click()
      .get(selectors.activeStep)
      .find("h3")
      .should("contain", steps[0].title)
      .get(selectors.completedStep)
      .should("have.length", 0);
  });

  it("shows Finish button on the last step", () => {
    cy.mount(<Stepper steps={steps} />)
      .get(selectors.continueButton)
      .click()
      .get(selectors.continueButton)
      .click()
      .get(selectors.finishButton)
      .should("exist");
  });

  it("calls onFinish when Finish button is clicked", () => {
    const onFinish = cy.stub().as("onFinish");
    cy.mount(<Stepper steps={steps} onFinish={onFinish} />)
      .get(selectors.continueButton)
      .click()
      .get(selectors.continueButton)
      .click()
      .get(selectors.finishButton)
      .click()
      .get("@onFinish")
      .should("have.been.called");
  });

  it("calls onStepChange when moving between steps", () => {
    const onStepChange = cy.stub().as("onStepChange");
    cy.mount(<Stepper steps={steps} onStepChange={onStepChange} />)
      .get(selectors.continueButton)
      .click()
      .get("@onStepChange")
      .should("have.been.calledWith", steps[1])
      .get(selectors.backButton)
      .click()
      .get("@onStepChange")
      .should("have.been.calledWith", steps[0]);
  });

  it("disables Finish button when isDisableFinish is true", () => {
    cy.mount(<Stepper steps={steps} isDisableFinish={true} />)
      .get(selectors.continueButton)
      .click()
      .get(selectors.continueButton)
      .click()
      .get(selectors.finishButton)
      .should("be.disabled");
  });

  it("renders the correct step component for the active step", () => {
    cy.mount(<Stepper steps={steps} />)
      .get(selectors.stepComponent)
      .contains("Step 1 Content")
      .get(selectors.continueButton)
      .click()
      .get(selectors.stepComponent)
      .contains("Step 2 Content");
  });

  it("renders step lines between steps", () => {
    cy.mount(<Stepper steps={steps} />)
      .get(selectors.stepLine)
      .should("have.length", steps.length - 1);
  });

  it("displays step titles and descriptions", () => {
    cy.mount(<Stepper steps={steps} />);
    steps.forEach((step, index) => {
      cy.get(selectors.stepContent)
        .eq(index)
        .find("h3")
        .should("contain", step.title);
      cy.get(selectors.stepContent)
        .eq(index)
        .find("p")
        .should("contain", step.description);
    });
  });
});
