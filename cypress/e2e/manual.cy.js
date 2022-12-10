/// <reference types="cypress" />

context("manual", () => {
  it("should open when manually open it", () => {
    cy.visit("/cypress/fixtures/manual.html");

    cy.get("#controller").trigger("click");

    cy.get("#popper").should("be.visible");
  });

  it("should close when manually close it", () => {
    cy.visit("/cypress/fixtures/manual.html");
    cy.get("#controller").trigger("click");

    cy.get("#controller").trigger("click");

    cy.get("#popper").should("not.be.visible");
  });
});
