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
            .type('Super Epic Vacation Trip!')
            .should('have.value', 'Super Epic Vacation Trip!')

        cy.get('select[name=startLocation]')
            .select('Aruba')
            .should('have.value', 'Aruba')

        cy.get('select[name=destination]')
            .select('Sweden')
            .should('have.value', 'Sweden')

        // cy.get('ngb-datepicker[name=calendar]')
        //     .contains('24')
        //     .select('24').click({ force: true })
        // cy.get('ngb-datepicker[name=calendar]')
        //     .get('ngb-dp-day[label=Sunday, October 24, 2021]')
        //     .select('24').click({ force: true })

        // cy.get('ngb-datepicker[name=calendar]')
        //     .select('28').click({ force: true })
    });
});