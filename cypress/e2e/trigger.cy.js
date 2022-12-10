/// <reference types="cypress" />

context("trigger", () => {
  it("should not open when hover reference after changing trigger to click-to-toggle", () => {
    cy.visit("/cypress/fixtures/trigger.html");

    cy.get("#controller").trigger("click");
    cy.get("#reference").trigger("mouseover");

    cy.get("#popper").should("not.be.visible");
  });

  it("should open when click reference after changing trigger to click-to-toggle", () => {
    cy.visit("/cypress/fixtures/trigger.html");

    cy.get("#controller").trigger("click");
    cy.get("#reference").trigger("click");

    cy.get("#popper").should("be.visible");
  });
});
