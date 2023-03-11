const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:3000',
        env: {
            userAuthData: {
                userName: 'SantaClaus',
                password: '123',
                firstName: 'Santa',
                lastName: 'Claus',
            },
            adminAuthData: {
                userName: 'admin',
                password: '123',
                firstName: 'Administrator',
            },
            superAdminAuthData: {
                userName: 'superAdmin',
                password: '123',
                firstName: 'Super',
            },
        },
    },
})
