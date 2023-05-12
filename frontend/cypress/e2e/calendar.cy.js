describe('main calendar', () => {
    const userAuthData = Cypress.env('userAuthData')
    const newTitle = 'Awesome title'

    before(() => {
        cy.login(userAuthData)
    })

    it('displays location btns', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
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
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.get('.rbc-event-content').should('have.length.least', 1)
    })

    it('displays event form on click', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.get('.rbc-event-content').first().click()
        cy.contains('View')
    })

    it('can add new event', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.get('.rbc-date-cell').eq(20).click()
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
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.contains(`${newTitle}`).click()

        cy.get('[id="select-location"]').click()
        cy.contains('Location 1')
        cy.contains('Location 2')

        cy.get('li[data-value="loc2"]').click()
        cy.get('.MuiButtonBase-root').contains('Update').click()

        cy.get('.MuiButtonBase-root').contains('Location 1').click()
        // cy.contains(`${newTitle}`).should('not.exist')

        cy.get('.MuiButtonBase-root').contains('Location 2').click()
        cy.get('.rbc-event-content').contains(`${newTitle}`).should('exist')
        cy.contains(`${newTitle}`).click()

        cy.get('button').contains('Delete').click()
    })
})
