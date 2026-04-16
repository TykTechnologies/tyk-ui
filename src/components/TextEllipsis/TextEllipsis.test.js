import React from "react";
import TextEllipsis from "./index";

/* eslint-disable react/prop-types */
function Component({ truncateFrom = "end" }) {
  return (
    <div
      className="text-ellipsis"
      style={{ marginTop: "200px", textAlign: "center" }}
    >
      <TextEllipsis
        text="alpha, bravo, charlie, delta, forgot the rest"
        limit={10}
        truncateFrom={truncateFrom}
      />
    </div>
  );
}

function TruncateFromStartComponent() {
  return (
    <div
      className="text-ellipsis-start"
      style={{ marginTop: "200px", textAlign: "center" }}
    >
      <TextEllipsis
        text="alpha, bravo, charlie, delta, forgot the rest"
        limit={8}
        truncateFrom="start"
      />
    </div>
  );
}

function ShortTextComponent() {
  return (
    <div
      className="text-ellipsis-short"
      style={{ marginTop: "200px", textAlign: "center" }}
    >
      <TextEllipsis text="short" limit={10} truncateFrom="start" />
    </div>
  );
}

describe("TextEllipsis", () => {
  const classes = {
    floatingContainer: "floating-container",
  };

  describe("Default behavior (truncate from end)", () => {
    it('should show first 10 chars followed by "..." when no truncateFrom is provided', () => {
      cy.mount(<Component />)
        .get(".text-ellipsis")
        .should("have.text", "alpha, bra...");
    });

    it('should show first 10 chars followed by "..." when truncateFrom is explicitly set to end', () => {
      cy.mount(<Component truncateFrom="end" />)
        .get(".text-ellipsis")
        .should("have.text", "alpha, bra...");
    });

    it("when hovering the truncated text, shows the tooltip with full text", () => {
      cy.mount(<Component />);
      cy.get(`.${classes.floatingContainer}`)
        .should("not.exist")
        .get(".text-ellipsis")
        .trigger("mouseover");

      cy.get(`.${classes.floatingContainer}`)
        .should(
          "contain.text",
          "alpha, bravo, charlie, delta, forgot the rest",
        );
    });
  });

  describe("Truncate from start behavior", () => {
    it('should show "..." at the beginning followed by last 10 chars when truncateFrom is start', () => {
      cy.mount(<TruncateFromStartComponent />)
        .get(".text-ellipsis-start")
        .should("have.text", "...the rest");
    });

    it("when hovering the start-truncated text, shows the tooltip with full text", () => {
      cy.mount(<TruncateFromStartComponent />);
      cy.get(`.${classes.floatingContainer}`)
        .should("not.exist")
        .get(".text-ellipsis-start")
        .trigger("mouseover");

      cy.get(`.${classes.floatingContainer}`)
        .should(
          "contain.text",
          "alpha, bravo, charlie, delta, forgot the rest",
        );
    });

    it("should handle certificate-like IDs properly when truncating from start", () => {
      const certificateId = "69ba61ddb8365d96f9917d7222cee600fadd3b0cd35d060b20e33182f7edae9f3a0373def3f4a50004d181ad";
      cy.mount(
        <div className="certificate-test">
          <TextEllipsis text={certificateId} limit={10} truncateFrom="start" />
        </div>,
      )
        .get(".certificate-test")
        .should("have.text", "...0004d181ad");
    });
  });

  describe("Edge cases", () => {
    it("should display full text without ellipsis when text length is less than limit", () => {
      cy.mount(<ShortTextComponent />)
        .get(".text-ellipsis-short")
        .should("have.text", "short")
        .should("not.contain", "...");
    });

    it("should display full text without ellipsis when text length equals limit", () => {
      cy.mount(
        <div className="text-ellipsis-equal">
          <TextEllipsis text="exactly10c" limit={10} truncateFrom="start" />
        </div>,
      )
        .get(".text-ellipsis-equal")
        .should("have.text", "exactly10c")
        .should("not.contain", "...");
    });

    it("should handle single character limit correctly for truncateFrom start", () => {
      cy.mount(
        <div className="single-char-start">
          <TextEllipsis text="hello world" limit={1} truncateFrom="start" />
        </div>,
      )
        .get(".single-char-start")
        .should("have.text", "...d");
    });

    it("should handle single character limit correctly for truncateFrom end", () => {
      cy.mount(
        <div className="single-char-end">
          <TextEllipsis text="hello world" limit={1} truncateFrom="end" />
        </div>,
      )
        .get(".single-char-end")
        .should("have.text", "h...");
    });
  });

  describe("Backward compatibility", () => {
    it("should maintain existing behavior when truncateFrom prop is not provided", () => {
      cy.mount(
        <div className="text-ellipsis-backward">
          <TextEllipsis
            text="this is a long text for testing backward compatibility"
            limit={15}
          />
        </div>,
      )
        .get(".text-ellipsis-backward")
        .should("have.text", "this is a long ...");
    });

    it("should work with existing props combination", () => {
      cy.mount(
        <div className="existing-usage">
          <TextEllipsis
            text="existing implementation should still work"
            limit={8}
            position="top"
          />
        </div>,
      )
        .get(".existing-usage")
        .should("have.text", "existing...");
    });
  });
});
