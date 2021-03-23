/// <reference types="cypress" />

context('delay', () => {
  it('should open when hovering reference', () => {
    cy.visit('/cypress/fixtures/delay.html')

    cy.get('#reference').trigger('mouseover')
    cy.wait(200)

    cy.get('#popper').should('be.visible')
  })

  it('should open when leave reference', () => {
    cy.visit('/cypress/fixtures/delay.html')
    cy.get('#reference').trigger('mouseover')
    cy.wait(200)

    cy.get('#reference').trigger('mouseout')
    cy.wait(200)

    cy.get('#popper').should('not.be.visible')
  })
})
