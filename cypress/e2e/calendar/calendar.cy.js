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

  it('displays two events by default', () => {
    cy.contains('Some title 1')
    cy.contains('Some title 2')
    cy.get('.rbc-event-content').should('have.length', 2)
    cy.get('.rbc-event-content').first().should('have.text', 'Some title 1')
    cy.get('.rbc-event-content').last().should('have.text', 'Some title 2')   
  })

  it('displays event update form on click', () => {
    cy.contains('Some title 1').click()
    cy.contains('Some title 1')
    cy.contains('Update')
 })

})
