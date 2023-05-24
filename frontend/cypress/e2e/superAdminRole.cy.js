describe('admin role permissions ', () => {
    const authData = Cypress.env('superAdminAuthData')

    beforeEach(() => {
        cy.clearStorages()
        cy.login(authData)
    })

    it('admin have dashboard access with enabled edit', () => {
        cy.contains('.MuiListItemText-root', 'Users')
            .should('not.be.disabled')
            .click()
        cy.contains('You dont have permissions').should('not.exist')
        cy.contains('Users').click()
        cy.get('table')
        cy.get('table > tbody > tr').should('have.length.least', 2)
        cy.contains('button', 'Edit').should('be.enabled')
        cy.contains('New user').should('exist')
    })

    it('admin can open add new user form with submit btn', () => {
        cy.contains('.MuiListItemText-root', 'Users')
            .should('not.be.disabled')
            .click()
        cy.contains('You dont have permissions').should('not.exist')
        cy.contains('Users').click()
        cy.contains('New user').should('exist').click()
        cy.contains('Add New User').should('exist')
        cy.contains('.MuiButtonBase-root', 'Submit').should('exist')
    })

    it('select users for event', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.get('.rbc-day-bg').eq(20).click()
        cy.contains('Add')
        cy.get('[id="select-user"]').click()
        cy.get('ul[aria-labelledby="select-user-label"]').should(
            'have.length.least',
            1
        )
    })

    it('can edit other users event', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.contains('New 1').click()
        cy.contains('Update')
        cy.contains('View').should('not.exist')
        cy.get('input[id="title"]').should('have.value', 'New 1')
        cy.get('input[id="title"]').focus().clear().type('New Sunshine 2')
        cy.get('.MuiButtonBase-root').contains('Update').click()
        cy.contains('New Sunshine 2')
    })

    it('access other user events', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Events').click()
        cy.get('.MuiDataGrid-cellContent').contains('Super Admin')
        cy.get('.MuiDataGrid-cellContent').contains('Santa Claus').dblclick()
        cy.contains('Update').should('exist')
    })
})
