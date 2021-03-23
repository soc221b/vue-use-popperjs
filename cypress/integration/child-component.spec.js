/// <reference types="cypress" />

context('child-component', () => {
  it('should works with child component', () => {
    cy.visit('/cypress/fixtures/child-component.html')

    cy.get('#reference').trigger('mouseover')

    cy.get('#popper').should('be.visible')
  })

  it('should close when leave reference', () => {
    cy.visit('/cypress/fixtures/child-component.html')
    cy.get('#reference').trigger('mouseover')

    cy.get('#reference').trigger('mouseout')

    cy.get('#popper').should('not.be.visible')
  })
})
