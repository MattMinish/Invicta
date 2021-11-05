import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Trips } from '../models/trips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TripsService {
  tripsCollection: AngularFirestoreCollection<Trips>;
  trips: Observable<Trips[]>;
  tripDoc: AngularFirestoreDocument<Trips>;
  countries: any = [];




  constructor(public afs: AngularFirestore, private http: HttpClient) {
    this.tripsCollection = this.afs.collection<Trips>('trips', ref => ref.orderBy('tripName', 'asc'));
    this.trips = this.tripsCollection.snapshotChanges()
      .pipe(map(changes => changes.map(a => {
        const data = a.payload.doc.data() as Trips;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
    this.tripDoc = this.afs.doc(`trips/1`);
    this.http.get<any>('https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode').subscribe(data => {
      console.log(data);
      data.data.forEach((item: { name: any; }) => {
        this.countries.push(item.name)
      })
    })
  }

  getRestrictions() {

    const httpOptions = {
      headers: {
        'Api-Version': '1',
        'Authorization': 'ApiKey cRBIlf.sYQwOLH5LcPUdjmPXbmnUdJueOxHLkhn',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',                 // cors error says this 'Access-Control-Allow-Origin': '*' needs to be in the header and it is so im not sure whats going on
        'Access-Control-Allow-methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      params: {
        'origin': 'FR',
        'destination': 'ES',
        'origin_type': 'country_code',
        'destination_type': 'country_code',
        'date': '2020-10-15'
      }
    };

    this.http.get('https://api.travelperk.com/travelsafe/restrictions', httpOptions).subscribe(data => {
      console.log(data);
    })
  }

  getTrips() {
    return this.trips;
  }

  addTrip(trip: Trips) {
    this.tripsCollection.add(trip);
  }

  deleteTrip(trip: Trips) {
    this.tripDoc = this.afs.doc(`trips/${trip.id}`);
    this.tripDoc.delete();
  }

  updateTrip(trip: Trips) {
    this.tripDoc = this.afs.doc(`trips/${trip.id}`);
    this.tripDoc.update(trip);
  }


}

