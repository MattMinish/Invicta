import firebase from 'firebase/compat/app';
import { getFirestore, collection, getDocs, query, where, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
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
    await setDoc(doc(db, 'trips', 'FirebaseTestTrip'), {
        destination: 'Sweden',
        endDate: '12/12/2022',
        startDate: '12/10/2022',
        startLocation: 'Norway',
        tripName: 'FirebaseTestTrip'
    });
}

async function getTripTest(id) {
    const tripRef = collection(db, 'trips');
    const q = query(tripRef, where('tripName', '==', 'FirebaseTestTrip'));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
        });
    }
    else {
        console.log('None found with that name');
    }
}

async function removeTripTest() {
    await deleteDoc(doc(db, 'trips', 'FirebaseTestTrip'));
}

async function getTripLocation() {

}

async function modifyTripTest() {
    const tripRef = doc(db, 'trips', 'FirebaseTestTrip');
    await updateDoc(tripRef, {
        startLocation: 'Albania'
    });

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


// to do:
    // fix promise rejection error

addTripTest();
sleep(1000);
getTripTest('FirebaseTestTrip');
sleep(1000);
modifyTripTest();
sleep(1000);
removeTripTest();
