
/// <reference types="Cypress" />

describe('main calendar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('displays location btns', () => {
    cy.get('.MuiToggleButtonGroup-root').children().should('have.length', 3)
    cy.contains('All locations')
    cy.contains('Location 1')
    cy.contains('Location 2')
  })

})
