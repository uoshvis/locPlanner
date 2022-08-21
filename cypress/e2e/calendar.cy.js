describe('main calendar', () => {
  beforeEach(() => {
    cy.visitLocal()
  })

  it('displays location btns', () => {
    cy.get('.MuiToggleButtonGroup-root button').should('have.length', 3)

    cy.get('.MuiToggleButtonGroup-root button').first().should('have.text', 'All locations')
    cy.get('.MuiToggleButtonGroup-root button').eq(1).should('have.text', 'Location 1')
    cy.get('.MuiToggleButtonGroup-root button').last().should('have.text', 'Location 2')
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
    const newTitle = "Awesome title"

    cy.get('.rbc-day-bg').eq(20).click()
    cy.contains('Add')

    cy.get('input[id="title"]').type(`${newTitle}`)

    cy.get('[id="location"]').click()
    cy.contains('Location 1')
    cy.contains('Location 2')

    cy.get('li[data-value="loc1"]').click()
    cy.get('.MuiButtonBase-root').contains('Add').click()

    cy.contains('Location 1').click()
    cy.contains(newTitle)
  })

  it('can update event Location', () => {
    cy.contains('Some title 1').click()

    cy.get('[id="location"]').click()
    cy.contains('Location 1')
    cy.contains('Location 2')

    cy.get('li[data-value="loc2"]').click()
    cy.get('.MuiButtonBase-root').contains('Update').click()

    cy.get('.MuiButtonBase-root').contains('Location 1').click()
    cy.contains('Some title 1').should('not.exist')

    cy.get('.MuiButtonBase-root').contains('Location 2').click()
    cy.contains('Some title 1').should('exist')
  })
})
