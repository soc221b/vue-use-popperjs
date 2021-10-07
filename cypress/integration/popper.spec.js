/// <reference types="cypress" />

context("popper", () => {
  it("should open when hovering reference", () => {
    cy.visit("/cypress/fixtures/popper.html");

    cy.get("#reference").trigger("mouseover");

    cy.get("#popper").should("be.visible");
  });

  it("should close when leave reference", () => {
    cy.visit("/cypress/fixtures/popper.html");
    cy.get("#reference").trigger("mouseover");

    cy.get("#reference").trigger("mouseout");

    cy.get("#popper").should("not.be.visible");
  });
});
