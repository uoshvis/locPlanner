describe('admin role permissions ', () => {
    const adminAuthData = Cypress.env('adminAuthData')

    beforeEach(() => {
        cy.clearStorages()
        cy.login(adminAuthData)
    })

    it('admin have dashboard access with disabled edit', () => {
        cy.contains('.MuiListItemText-root', 'Users')
            .should('not.be.disabled')
            .click()
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

    it.only('access other user events', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Events').click()
        cy.get('.MuiDataGrid-cellContent').contains('Super Admin')
        cy.get('.MuiDataGrid-cellContent').contains('Santa Claus').dblclick()
        cy.contains('Update').should('exist')
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
})
