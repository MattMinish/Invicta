/// <reference types="Cypress" />

describe('About Page', () => {
    it('Nav bar links', () => {

        cy.visit('/about'); // go to the home page

        // Home 
        cy.contains('Invicta').click()
        cy.location('pathname').should('eq', '/')
        cy.go('back')

        // Trips 
        cy.contains('Trips').click()
        cy.location('pathname').should('eq', '/trips')
        cy.go('back')

        // Account 
        cy.contains('Account').click()
        cy.location('pathname').should('eq', '/login')
        cy.go('back')

        // Login 
        cy.contains('Login').click()
        cy.location('pathname').should('eq', '/login')
        cy.go('back')
    });
    it('Image Hover', () => {

        cy.visit('/about'); // go to the home page

        // Leesa 
        cy.get('[alt="Leesa Picture"]').trigger('mouseover', { force: true })
        cy.contains('Leesa Marie Price')

        // Matthew 
        cy.get('[alt="Matthew Picture"]').trigger('mouseover', { force: true })
        cy.contains('Matthew Minish')

        // Grayson 
        cy.get('[alt="Grayson Picture"]').trigger('mouseover', { force: true })
        cy.contains('Grayson Martin')
    });

});