/// <reference types="cypress" />

context('click-to-open', () => {
  it('should open when clicking reference', () => {
    cy.visit('/cypress/fixtures/click-to-open.html')

    cy.get('#reference').trigger('click')

    cy.get('#popper').should('be.visible')
  })

  it('should keep open when clicking reference', () => {
    cy.visit('/cypress/fixtures/click-to-open.html')
    cy.get('#reference').trigger('click')

    cy.get('#reference').trigger('click')

    cy.get('#popper').should('be.visible')
  })

  it('should keep open when clicking popper', () => {
    cy.visit('/cypress/fixtures/click-to-open.html')
    cy.get('#reference').trigger('click')

    cy.get('#popper').trigger('click')

    cy.get('#popper').should('be.visible')
  })

  it('should close when click outside', () => {
    cy.visit('/cypress/fixtures/click-to-open.html')
    cy.get('#reference').trigger('click')
    cy.get('#popper').should('be.visible')

    cy.get('body').trigger('click')

    cy.get('#popper').should('not.be.visible')
  })
})
