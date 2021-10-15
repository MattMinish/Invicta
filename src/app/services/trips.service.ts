import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Trips } from '../models/trips';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TripsService {
  // tripsCollection: AngularFirestoreCollection<Trips>;
  trips : Observable<Trips[]>;


  constructor(public afs: AngularFirestore) { 
    this.trips = this.afs.collection<Trips>('trips').valueChanges();
  }

  getTrips(){
    return this.trips;
  }
}

