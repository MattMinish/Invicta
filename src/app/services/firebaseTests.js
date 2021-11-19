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

async function getTripTest(id) {
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
        console.log('Got trip location: Albania')
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
    getTripTest('FirebaseTestTrip');
}, 3500)