import React from "react";
import ProgressBar from "./index";

describe("ProgressBar", () => {
  it("renders the component with proper classes and attributes based on props", () => {
    cy.mount(
      <ProgressBar
        value={50}
        max={100}
        theme="success"
        size="lg"
        className="custom-class"
        id="test-progress"
      />
    )
      .get(".tyk-progress-bar")
      .should("have.class", "tyk-progress-bar--success")
      .and("have.class", "tyk-progress-bar--lg")
      .and("have.class", "custom-class")
      .and("have.attr", "id", "test-progress");
  });

  it("calculates and displays the correct progress percentage", () => {
    cy.mount(<ProgressBar value={25} max={100} />);

    cy.get(".tyk-progress-bar__progress")
      .should("have.attr", "style")
      .and("include", "width: 25%");

    cy.get(".tyk-progress-bar__progress")
      .should("have.attr", "aria-valuenow", "25")
      .and("have.attr", "aria-valuemin", "0")
      .and("have.attr", "aria-valuemax", "100");
  });

  it("handles values greater than max by capping at 100%", () => {
    cy.mount(<ProgressBar value={150} max={100} />);

    cy.get(".tyk-progress-bar__progress")
      .should("have.attr", "style")
      .and("include", "width: 100%");
  });

  it("handles negative values by setting to 0%", () => {
    cy.mount(<ProgressBar value={-10} max={100} />);

    cy.get(".tyk-progress-bar__progress")
      .should("have.attr", "style")
      .and("include", "width: 0%");
  });

  it("displays the label when provided", () => {
    const label = "Loading progress";
    cy.mount(<ProgressBar value={50} label={label} />);

    cy.get(".tyk-progress-bar__label").should("exist").and("contain", label);
  });

  it("displays the percentage text when showPercentage is true", () => {
    cy.mount(<ProgressBar value={75} showPercentage={true} />);

    cy.get(".tyk-progress-bar__percentage")
      .should("exist")
      .and("contain", "75%")
      .and("have.class", "tyk-progress-bar__percentage--bottom");
  });

  it("displays the percentage text in the specified position", () => {
    cy.mount(
      <ProgressBar value={75} showPercentage={true} percentagePosition="top" />
    );

    cy.get(".tyk-progress-bar__percentage")
      .should("exist")
      .and("have.class", "tyk-progress-bar__percentage--top");
  });

  it("displays the percentage text in inside position", () => {
    cy.mount(
      <ProgressBar
        value={75}
        showPercentage={true}
        percentagePosition="inside"
      />
    );

    cy.get(".tyk-progress-bar__percentage")
      .should("exist")
      .and("have.class", "tyk-progress-bar__percentage--inside");
  });

  it("uses formatPercentage function when provided", () => {
    cy.mount(
      <ProgressBar
        value={75}
        showPercentage={true}
        formatPercentage={(value) => `${value}% completed`}
      />
    );

    cy.get(".tyk-progress-bar__percentage")
      .should("exist")
      .and("contain", "75% completed");
  });

  it("uses default percentage formatter when formatPercentage is not provided", () => {
    cy.mount(<ProgressBar value={75} showPercentage={true} />);

    cy.get(".tyk-progress-bar__percentage")
      .should("exist")
      .and("contain", "75%");
  });

  it("does not display the percentage text when showPercentage is false", () => {
    cy.mount(<ProgressBar value={75} showPercentage={false} />);

    cy.get(".tyk-progress-bar__percentage").should("not.exist");
  });

  it("displays bottom label when showBottomLabel is true", () => {
    cy.mount(<ProgressBar value={75} showBottomLabel={true} />);

    cy.get(".tyk-progress-bar__bottom-label")
      .should("exist")
      .and("contain", "75%");
  });

  it("does not display bottom label when showBottomLabel is false", () => {
    cy.mount(<ProgressBar value={75} showBottomLabel={false} />);

    cy.get(".tyk-progress-bar__bottom-label").should("not.exist");
  });

  it("uses formatBottomLabel function when provided", () => {
    cy.mount(
      <ProgressBar
        value={75}
        showBottomLabel={true}
        formatBottomLabel={(value) => `${value}% compliant`}
      />
    );

    cy.get(".tyk-progress-bar__bottom-label")
      .should("exist")
      .and("contain", "75% compliant");
  });

  it("uses default bottom label formatter when formatBottomLabel is not provided", () => {
    cy.mount(<ProgressBar value={75} showBottomLabel={true} />);

    cy.get(".tyk-progress-bar__bottom-label")
      .should("exist")
      .and("contain", "75%");
  });

  it("forwards additional props to the root element", () => {
    cy.mount(
      <ProgressBar
        value={50}
        data-testid="progress-test"
        data-custom="custom-value"
      />
    );

    cy.get(".tyk-progress-bar")
      .should("have.attr", "data-testid", "progress-test")
      .and("have.attr", "data-custom", "custom-value");
  });
});
