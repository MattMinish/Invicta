import firebase from 'firebase/compat/app';
import { getFirestore, collection, getDocs, getDoc, query, where, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import 'firebase/firestore';
import { assert } from 'console';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

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

async function addTripTest() {
    console.log('Adding a new test trip to the database with name: FirebaseTestTrip')
    await setDoc(doc(db, 'trips', 'FirebaseTestTrip'), {
        destination: 'Sweden',
        endDate: '12/12/2022',
        startDate: '12/10/2022',
        startLocation: 'Norway',
        tripName: 'FirebaseTestTrip'
    });
}

async function getTripTest() {
    //console.log('Querying the new test trip')
    const tripRef = collection(db, 'trips');
    const q = query(tripRef, where('tripName', '==', 'FirebaseTestTrip'));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log('Found test trip with name: ' + doc.data().tripName)
            //console.log(doc.id, ' => ', doc.data());
        });

    }
    else {
        console.log('No trip found with name: FirebaseTestTrip');
    }
}

async function removeTripTest() {
    console.log('Removing test trip')
    await deleteDoc(doc(db, 'trips', 'FirebaseTestTrip'));
}

async function getTripLocation() {
    const tripRef = doc(db, 'trips', 'FirebaseTestTrip');
    //const q = query(tripRef, where('tripName', '==', 'FirebaseTestTrip'));
    const querySnapshot = await getDoc(tripRef);
    var data = querySnapshot.data()
    var startLocation = data.startLocation;
    
    if(startLocation == 'Albania'){
        console.log('Successfully got updated trip location: Albania')
    }
    else{
        console.log('Failed to get correct trip location')
    }
}

async function modifyTripTest() {
    const tripRef = doc(db, 'trips', 'FirebaseTestTrip');
    await updateDoc(tripRef, {
        startLocation: 'Albania'
    });

    console.log('Updated startLocation from Sweden to Albania')
}

async function getTrips(db) {
    const citiesCol = collection(db, 'trips');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log('cities: ' + cityList.values());
    return cityList;
}

async function addUserTest(){
    console.log('Adding a new test user to the database with name: TestUser')
    await setDoc(doc(db, 'users', 'TestUser'), {
        displayName: 'Test User',
        email: 'testEmail@gmail.com'
    });
}

async function removeUserTest() {
    console.log('Removing test user')
    await deleteDoc(doc(db, 'users', 'TestUser'));
}

async function getUserTest() {
    const tripRef = collection(db, 'users');
    const q = query(tripRef, where('displayName', '==', 'Test User'));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log('Found user with name: ' + doc.data().displayName)
            //console.log(doc.id, ' => ', doc.data());
        });

    }
    else {
        console.log('No user found with name: TestUser');
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

addTripTest();

setTimeout(function() {
    getTripTest('FirebaseTestTrip');
}, 1000)

setTimeout(function() {
    modifyTripTest();
}, 2000)

setTimeout(function() {
    getTripLocation();
}, 2500)

setTimeout(function() {
    removeTripTest();
}, 3000)

setTimeout(function() {
    getTripTest();
}, 3500)

setTimeout(function() {
    addUserTest();
}, 4000)

setTimeout(function() {
    getUserTest();
}, 4500)

setTimeout(function() {
    removeUserTest();
}, 5000)

setTimeout(function() {
    getUserTest();
}, 5500)