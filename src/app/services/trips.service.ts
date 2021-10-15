import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Trips } from '../models/trips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TripsService {
  tripsCollection: AngularFirestoreCollection<Trips>;
  trips : Observable<Trips[]>;
  tripDoc: AngularFirestoreDocument<Trips>;


  constructor(public afs: AngularFirestore) { 
    this.tripsCollection = this.afs.collection<Trips>('trips', ref => ref.orderBy('tripName', 'asc'));
    this.trips = this.tripsCollection.snapshotChanges()
    .pipe(map(changes => changes.map(a => {
      const data = a.payload.doc.data() as Trips;
      const id = a.payload.doc.id;
      return {id, ...data};
    })));
    this.tripDoc = this.afs.doc(`trips/1`);
  }

  getTrips(){
    return this.trips;
  }

  addTrip(trip : Trips){
    this.tripsCollection.add(trip);
  }

  deleteTrip(trip :Trips){
    this.tripDoc = this.afs.doc(`trips/${trip.id}`);
    this.tripDoc.delete();
  }

  updateTrip(trip :Trips){
    this.tripDoc = this.afs.doc(`trips/${trip.id}`);
    this.tripDoc.update(trip);
  }


}

