describe('user role permissions ', () => {
    const userAuthData = Cypress.env('userAuthData')
    beforeEach(() => {
        cy.login(userAuthData)
    })

    it('user does not have dashboard permission', () => {
        cy.contains('.MuiListItemText-root', 'Users').click()
        cy.contains('You dont have permissions')
    })

    it('access user profile page', () => {
        cy.get('.MuiAvatar-root').click()
        cy.get('[role="menuitem"]').contains('Profile').click()
        cy.get('input').should('be.disabled')
        cy.get('[id="firstName"]').should('have.value', userAuthData.firstName)
        cy.get('[id="lastName"]').should('have.value', userAuthData.lastName)
        cy.get('button').contains('Your color').should('be.disabled')
        cy.get('button').contains('Edit').should('be.enabled')
    })

    it('can add new event only for self', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.get('.rbc-day-bg').eq(20).click()
        cy.contains('Add')
        cy.get('[id="select-user"]').click()
        cy.get('ul[aria-labelledby="select-user-label"]').should(
            'have.length',
            1
        )
    })

    it('can only view other users event', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.contains('Sunshine 2').click()
        cy.contains('.MuiDialog-container', userAuthData.firstName).should(
            'not.exist'
        )
        cy.contains('View')
        cy.contains('Update').should('not.exist')
        cy.get('input[id="title"]').should('be.disabled')
        cy.get('input[id="title"]').should('have.value', 'Sunshine 2')
    })
})
