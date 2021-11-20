/// <reference types="Cypress" />

describe('Home Page', () => {
    it('Nav bar links', () => {
        
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

        // Account 
        cy.contains('Account').click()
        cy.location('pathname').should('eq', '/login')
        cy.go('back')

    });

        it('Contains Image', () => {
        cy.get('[alt="Responsive image"]').trigger('mouseover', { force: true })
        
    });
});