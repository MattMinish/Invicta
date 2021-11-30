import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';
import { Trips } from 'src/app/models/trips';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  trips: Trips[] = [];
  editState: boolean = false;
  tripToEdit: Trips = {
    destination: "",
    endDate: "",
    startDate: "",
    startLocation: "",
    tripName: "",
    id: "",
    userID: "",
    destinationImg: "",
    authorization_status: "",
    restrictions_summary: "",
  }
  public countries: any = [];
  public user$!: Observable<User | null | undefined>;
  userUID: string = "";
  private userSubscription!: Subscription;

  constructor(public tripService: TripsService, public userService: UserService, private afs: AngularFirestore, private http: HttpClient,public messageService: MessageService) {
    this.userUID = userService.getUserID();
    this.tripToEdit.userID = this.userUID;
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => {
      if (user) {
        this.userUID = this.userService.getUserID();
        this.tripService.getTrips().subscribe(trips => {
          this.trips = trips.filter(trip => trip.userID == this.userUID);
          this.trips.forEach(trip => {
            if (trip.destinationImg == "") {
              this.http.post<any>('https://countriesnow.space/api/v0.1/countries/flag/images', { country: trip.destination }).subscribe(data => {
                trip.destinationImg = data.data.flag;
              })
            }
            if (trip.authorization_status == "") {
              this.http.get<any>('http://localhost:3000/getRestrictions').subscribe(data => {
                trip.authorization_status = data.authorization_status;
                trip.restrictions_summary = data.summary;
                this.tripService.updateTrip(trip);
              });
            }
          })
        });
      }
    });

    this.countries = this.tripService.countries;
  }

  deleteTrip(event: Event, trip: Trips) {
    this.clearState();
    this.tripService.deleteTrip(trip);
  }

  editTrip(event: Event, trip: Trips) {
    this.editState = true;
    this.tripToEdit = trip;
  }

  updateTrip(trip: Trips) {
    this.http.post<any>('https://countriesnow.space/api/v0.1/countries/flag/images', { country: trip.destination }).subscribe(data => {
      console.log(data);
      trip.destinationImg = data.data.flag;
      this.tripService.updateTrip(trip);
      this.clearState();
    })
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
                this.messageService.sendMessage("Your trips authorization status has changed log in to see updates.");
                this.tripService.updateTrip(trip);
                
              }
            });
          })
          
        });
        
      }
    });
    
  }

  clearState() {
    this.editState = false;
    this.tripToEdit = {
      destination: "",
      endDate: "",
      startDate: "",
      startLocation: "",
      tripName: "",
      destinationImg: "",
      authorization_status: "",
      restrictions_summary: "",
    }
  }

}