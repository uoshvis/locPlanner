describe('Login Page', () => {
    it('loads successfully', () => {
        // ARRANGE
        cy.clearStorages()
        cy.visit('/')

        // ACT

        // ASSERT

        // Login Form
        cy.get('h1').should('contain.text', 'Sign in')
        cy.get('form').should('be.visible')
        cy.get('input')
            .get('[name="userName"]')
            .should('be.visible')
            .should('have.focus')
        cy.get('input').get('[name="password"]').should('be.visible')
        cy.get('button').should('contain.text', 'Sign In').should('be.enabled')
    })

    it('SantaClaus logins and welcomes Santa', () => {
        const userAuthData = Cypress.env('userAuthData')
        cy.login(userAuthData)
    })
})
