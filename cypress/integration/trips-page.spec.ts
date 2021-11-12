/// <reference types="Cypress" />

describe('Trip Page', () => {
    it('Nav bar links', () => {

        cy.visit('/trips'); // go to the home page

        // Home 
        cy.contains('Invicta').click()
        cy.location('pathname').should('eq', '/')
        cy.go('back')

        // About 
        cy.contains('About').click()
        cy.location('pathname').should('eq', '/about')
        cy.go('back')

        // Login 
        cy.contains('Login').click()
        cy.location('pathname').should('eq', '/login')
        cy.go('back')
    });
    it('Adding Trip', () => {

        cy.visit('/trips');

        cy.get('input[name=tripName]')
            .type('Cypress Test Trip')
            .should('have.value', 'Cypress Test Trip')

        cy.get('select[name=startLocation]')
            .select('Bangladesh')
            .should('have.value', 'Bangladesh')

        cy.get('select[name=destination]')
            .select('Jamaica')
            .should('have.value', 'Jamaica')

        cy.get('ngb-datepicker[name=calendar]')
            .get('*[class^="ngb-dp-content ngb-dp-months"]')
            .contains('24').click({ force: true })
            .get('*[class^="ngb-dp-content ngb-dp-months"]')
            .contains('27').click({ force: true })

        cy.get('input[name=submitButton]')
            .click({ force: true })

        cy.contains('Cypress Test Trip')
    });

    it('Removing Trip', () => {

        cy.visit('/trips');

        cy.get('*[class^="container trips"]')
            .get('div').contains('Cypress Test Trip')
                .contains('*[class^="fa fa-pencil"]').click({ force: true })
            //.get('h2').contains('Cypress Test Trip')
            //.get('*[class^="fa fa-pencil"]').click({ force: true })
    });
});