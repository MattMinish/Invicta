/// <reference types="Cypress" />
import firebase from 'firebase/compat/app';
import { getFirestore, collection, getDocs, getDoc, query, where, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyB-RyFBh_eddULlQI7hFEonsqGbCMVhrn4',
    authDomain: 'invicta-5ec44.firebaseapp.com',
    projectId: 'invicta-5ec44',
    storageBucket: 'invicta-5ec44.appspot.com',
    messagingSenderId: '363429658409',
    appId: '1:363429658409:web:95688b2d8f8804efe88138',
    measurementId: 'G-L76EGCYRWY'
};

const app = firebase.initializeApp(config);
const db = getFirestore(app);

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

        // Account 
        cy.contains('Account').click()
        cy.location('pathname').should('eq', '/login')
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

        getTripTest()
    });

    it('Removing Trip', () => {
        async function removeTripTest() {
            console.log('Removing test trip')
            await deleteDoc(doc(db, 'trips', 'Cypress Test Trip'));
        }

        removeTripTest()

    });
    // it('Removing Trip', () => {

    //     cy.visit('/trips');

    //     cy.get('*[class^="container trips"]')
    //         .get('div').contains('Cypress Test Trip')
    //         .contains('*[class^="fa fa-pencil"]').click({ force: true })
    //     //.get('h2').contains('Cypress Test Trip')
    //     //.get('*[class^="fa fa-pencil"]').click({ force: true })
    // });
});

async function getTripTest() {
    const tripRef = collection(db, 'trips');
    const q = query(tripRef, where('tripName', '==', 'Cypress Test Trip'));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log('Found test trip with name: ' + doc.data().tripName)
            //console.log(doc.id, ' => ', doc.data());
        });

    }
    else {
        console.log('No trip found with name: Cypress Test Trip');
    }
}