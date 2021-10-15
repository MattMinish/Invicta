import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';
import { Trips } from 'src/app/models/trips';


@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  trips: Trips[] = [];

  constructor(public tripService: TripsService) { }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe(trips => { 
      this.trips = trips;
    });
  }


}
