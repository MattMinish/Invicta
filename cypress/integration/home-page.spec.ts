/// <reference types="Cypress" />

describe('Home Page', () => {
    it('Testing all navigation links', () => {
        
        cy.visit('/'); // go to the home page

        // About 
        cy.contains('About').click()
        cy.location('pathname').should('eq', '/about')
        cy.go('back')

        // Trips 
        cy.contains('Trips').click()
        cy.location('pathname').should('eq', '/trips')
        cy.go('back')

        // Login 
        cy.contains('Login').click()
        cy.location('pathname').should('eq', '/login')
        cy.go('back')
    });
});