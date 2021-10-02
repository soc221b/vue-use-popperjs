/// <reference types="cypress" />

context("updated", () => {
  it("should works when component updated", () => {
    cy.visit("/cypress/fixtures/updated.html");

    cy.get("#controller").trigger("click");
    cy.get("#reference").trigger("mouseover");

    cy.get("#popper").should("be.visible");
  });
});
