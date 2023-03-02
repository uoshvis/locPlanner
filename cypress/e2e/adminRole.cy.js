describe('admin role permissions ', () => {
    const adminAuthData = Cypress.env('adminAuthData')

    beforeEach(() => {
        cy.login(adminAuthData)
    })

    it('admin have dashboard access with disabled edit', () => {
        cy.contains('.MuiListItemText-root', 'Users').click()
        cy.contains('You dont have permissions').should('not.exist')
        cy.contains('Users').click()
        cy.get('table')
        cy.get('table > tbody > tr').should('have.length.least', 2)
        cy.contains('button', 'Edit').should('be.disabled')
        cy.contains('Add').should('not.exist')
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
        cy.contains('Sunshine 2').click()
        cy.contains('Update')
        cy.contains('View').should('not.exist')
        cy.get('input[id="title"]').should('have.value', 'Sunshine 2')
        cy.get('input[id="title"]').focus().clear().type('New Sunshine 2')
        cy.get('.MuiButtonBase-root').contains('Update').click()
        cy.contains('New Sunshine 2')
    })
})
