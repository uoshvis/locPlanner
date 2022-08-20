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

  it('opens add new form on slot click', () => {
    cy.get('.rbc-day-bg').eq(20).click()
    cy.contains('Add')
  })

  it('can add new event', () => {
    cy.get('.rbc-day-bg').eq(20).click()
    cy.contains('Add')

    const newTitle = "Awesome title"
    cy.get('input[id="title"]').type(`${newTitle}`)

    cy.get('[id="location"]').click()
    cy.contains('Location 1')
    cy.contains('Location 2')

    cy.get('li[data-value="loc1"]').click()
    cy.get('.MuiButtonBase-root').contains('Add').click()

    cy.contains('Location 1').click()
    cy.contains(newTitle)

})

})
