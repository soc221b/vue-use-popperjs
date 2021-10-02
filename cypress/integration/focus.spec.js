/// <reference types="cypress" />

context("focus", () => {
  it("should open when focusing reference", () => {
    cy.visit("/cypress/fixtures/focus.html");

    cy.get("#reference").trigger("focus");

    cy.get("#popper").should("be.visible");
  });

  it("should close when blur it", () => {
    cy.visit("/cypress/fixtures/focus.html");
    cy.get("#reference").trigger("focus");

    cy.get("#reference").trigger("blur");

    cy.get("#popper").should("not.be.visible");
  });
});
