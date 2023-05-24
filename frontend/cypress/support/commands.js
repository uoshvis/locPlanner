// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clearStorages', () => {
    // clear localStorage not to use auto-login feature
    cy.window().then((win) => win.sessionStorage.clear())
    cy.clearCookies()
    cy.clearLocalStorage()
})

Cypress.Commands.add('login', (loginData) => {
    cy.visit('/')
    cy.get('input[name="userName"]').click().type(loginData.userName)
    cy.get('input#password').type(loginData.password)
    cy.get('button').should('be.enabled')
    cy.get('form').submit()

    // ASSERT

    cy.get('.MuiTypography-root').should(
        'contain.text',
        `Welcome back ${loginData.firstName}`
    )
})

Cypress.Commands.add('visitWithLogin', (url, loginData) => {
    cy.visit(url)
    cy.get('input[name="userName"]').click().type(loginData.userName)
    cy.get('input#password').type(loginData.password)
    cy.get('button').should('be.enabled')
    cy.get('form').submit()

    // ASSERT
    cy.get('.MuiToolbar-root').within(() => {
        cy.get('p').should(
            'contain.text',
            `Welcome back ${loginData.firstName}`
        )
    })
})
