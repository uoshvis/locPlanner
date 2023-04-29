describe('user role permissions ', () => {
    const userAuthData = Cypress.env('userAuthData')
    beforeEach(() => {
        cy.login(userAuthData)
    })

    it('user does not have dashboard permission', () => {
        cy.contains('.MuiListItem-root', 'Users').should('exist')
        cy.get('.MuiListItem-root')
            .contains('Users')
            .should('have.class', 'Mui-disabled')

        cy.contains('You dont have permissions').should('not.exist')
        cy.visit('/users')
        cy.contains('You dont have permissions').should('exist')
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

    it('can select event user only for self', () => {
        cy.get('a').contains('.MuiListItemText-root', 'Calendar').click()
        cy.get('.rbc-date-cell').eq(20).click()
        cy.contains('Add')
        cy.get('[id="select-user"]').click()
        cy.get('ul[aria-labelledby="select-user-label"]')
            .should('have.length', 1)
            .contains(userAuthData.firstName)
            .contains(userAuthData.lastName)
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
