describe('user role permissions ', () => {
    const userAuthData = Cypress.env('userAuthData')
    beforeEach(() => {
        cy.login(userAuthData)
    })

    it('user does not have dashboard permission', () => {
        cy.get('.MuiAvatar-root').click()
        cy.get('[role="menuitem"]').contains('Dashboard').click()
        cy.contains('You dont have permissions')
    })

    it('can add new event only for self', () => {
        cy.get('a').contains('.MuiButtonBase-root', 'Calendar').click()
        cy.get('.rbc-day-bg').eq(20).click()
        cy.contains('Add')
        cy.get('[id="select-user"]').click()
        cy.get('ul[aria-labelledby="select-user-label"]').should(
            'have.length',
            1
        )
    })

    it('can only view other users event', () => {
        cy.get('a').contains('.MuiButtonBase-root', 'Calendar').click()
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
