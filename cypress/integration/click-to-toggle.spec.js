/// <reference types="cypress" />

context("click-to-toggle", () => {
  it("should open when clicking reference", () => {
    cy.visit("/cypress/fixtures/click-to-toggle.html");

    cy.get("#reference").trigger("click");

    cy.get("#popper").should("be.visible");
  });

  it("should close when clicking reference and it is opening", () => {
    cy.visit("/cypress/fixtures/click-to-toggle.html");
    cy.get("#reference").trigger("click");

    cy.get("#reference").trigger("click");

    cy.get("#popper").should("not.be.visible");
  });

  it("should close when click outside", () => {
    cy.visit("/cypress/fixtures/click-to-toggle.html");
    cy.get("#reference").trigger("click");
    cy.get("#popper").should("be.visible");

    cy.get("body").trigger("click", "bottomRight");

    cy.get("#popper").should("not.be.visible");
  });
});
