import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { TripsService } from '../services/trips.service';
import { Trips } from '../models/trips';
import { MessageService } from '../services/message.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-trippage',
  templateUrl: './trippage.component.html',
  styleUrls: ['./trippage.component.css']
})
export class TrippageComponent implements OnInit {

  user$!: Observable<User | null | undefined>;
  private userSubscription!: Subscription;
  userUID: string = "";
  trips: Trips[] = [];
  constructor(public userService: UserService, private afs: AngularFirestore, public tripService: TripsService, public messageService: MessageService, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => {
      if (user) {
        this.userUID = this.userService.getUserID();
        this.tripService.getTrips().subscribe(trips => {
          this.trips = trips.filter(trip => trip.userID == this.userUID);
          this.trips.forEach(trip => {
            this.http.get<any>('http://localhost:3000/getRestrictions').subscribe(data => {
              if (trip.authorization_status != data.authorization_status) {
                trip.authorization_status = data.authorization_status;
                trip.restrictions_summary = data.summary;
                this.tripService.updateTrip(trip);
              }
            });
          })
        });
      }
    });
    this.messageService.sendMessage("Your trips authorization status has changed log in to see updates.");
  }

}
