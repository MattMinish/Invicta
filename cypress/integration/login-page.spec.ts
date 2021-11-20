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

    it('Test User Not Logged in ', () => {

        cy.visit('/login'); // go to the home page
        cy.contains('Howdy, GUEST')

    });

    it('Login Button', () => {

        cy.visit('/login'); // go to the home page
        cy.contains('Log in with Google')
    });
    // it('User Login', () => {

    //     const stub = cy.stub()
    //     cy.visit('/login');

    //     cy.contains('Log in with Google').click()
    //     cy.on('window:alert', stub)
    //     cy.url().should('contain', 'accounts.google.com')  
    //         .get('input[type="email"]').type('communicationsByInvicta@gmail.com{enter}')
    //     // cy.window().then(function(p){
    //     //     cy.url().should('contain', 'accounts.google.com')  
    //     //         .get('input[type="email"]').type('communicationsByInvicta@gmail.com{enter}')
    //     // });
        
    //     //cy.contains('Email or phone').click().type('communicationsByInvicta@gmail.com{enter}')

    //     // cy.get('input[name=password]')
    //     //     .type('password')
    //     //     .should('have.value', 'password')

    //     // cy.contains('login').click( {force: true })

    // });
});