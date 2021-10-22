/// <reference types="Cypress" />

describe('Login Page', () => {
    it('Nav bar links', () => {

        cy.visit('/login'); // go to the home page

        // About 
        cy.contains('About').click()
        cy.location('pathname').should('eq', '/about')
        cy.go('back')

        // Trips 
        cy.contains('Trips').click()
        cy.location('pathname').should('eq', '/trips')
        cy.go('back')

        // Home 
        cy.contains('Invicta').click()
        cy.location('pathname').should('eq', '/')
        cy.go('back')
    });

    // it('User Login', () => {

    //     cy.visit('/login');

    //     cy.get('input[name=username]')
    //         .type('admin')
    //         .should('have.value', 'admin')

    //     cy.get('input[name=password]')
    //         .type('password')
    //         .should('have.value', 'password')

    //     cy.contains('login').click( {force: true })

    // });
});