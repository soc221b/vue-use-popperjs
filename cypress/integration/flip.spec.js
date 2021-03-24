/// <reference types="cypress" />

context('flip', () => {
  it('should open when hovering reference', () => {
    cy.visit('/cypress/fixtures/flip.html')
    cy.get('#reference').trigger('click')
    cy.get('#app').scrollTo('top')
    cy.get('#popper[data-popper-placement="top"]').should('exist')

    cy.get('#app').scrollTo('bottom')

    cy.get('#popper[data-popper-placement="bottom"]').should('exist')
  })
})
