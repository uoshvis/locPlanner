describe('main calendar', () => {
    const userAuthData = Cypress.env('userAuthData')
    before(() => {
        cy.login(userAuthData)
    })

    it('displays location btns', () => {
        cy.get('a').contains('.MuiButtonBase-root', 'Calendar').click()
        cy.get('.MuiToggleButtonGroup-root button').should('have.length', 3)
        cy.get('.MuiToggleButtonGroup-root button')
            .first()
            .should('have.text', 'All locations')
        cy.get('.MuiToggleButtonGroup-root button')
            .eq(1)
            .should('have.text', 'Location 1')
        cy.get('.MuiToggleButtonGroup-root button')
            .last()
            .should('have.text', 'Location 2')
    })

    it('displays events by default', () => {
        cy.contains('Bird song 1')
        cy.contains('Sunrise 2')
        cy.get('.rbc-event-content').should('have.length', 6)
    })

    it('displays event update form on click', () => {
        cy.contains('Bird song 1').click()
        cy.contains('Bird song 1')
        cy.contains('Update')
        cy.get('button:contains("Cancel")').click()
    })

    it('can add new event', () => {
        const newTitle = 'Awesome title'

        cy.get('.rbc-day-bg').eq(20).click()
        cy.contains('Add')

        cy.get('input[id="title"]').type(`${newTitle}`)

        cy.get('[id="select-location"]').click()
        cy.contains('Location 1')
        cy.contains('Location 2')

        cy.get('li[data-value="loc1"]').click()
        cy.get('.MuiButtonBase-root').contains('Add').click()

        cy.contains('Location 1').click()
        cy.contains(newTitle)
    })

    it('can update event Location', () => {
        cy.contains('Bird song 1').click()

        cy.get('[id="select-location"]').click()
        cy.contains('Location 1')
        cy.contains('Location 2')

        cy.get('li[data-value="loc2"]').click()
        cy.get('.MuiButtonBase-root').contains('Update').click()

        cy.get('.MuiButtonBase-root').contains('Location 1').click()
        cy.contains('Bird song 1').should('not.exist')

        cy.get('.MuiButtonBase-root').contains('Location 2').click()
        cy.contains('Bird song 1').should('exist')
    })
})
