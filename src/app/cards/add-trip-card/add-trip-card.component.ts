import { Component, OnInit } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';
import { Trips } from 'src/app/models/trips';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-trip-card',
  templateUrl: './add-trip-card.component.html',
  styleUrls: ['./add-trip-card.component.css']
})
export class AddTripCardComponent implements OnInit {
  trip: Trips = {
    destination: "",
    endDate: "",
    startDate: "",
    startLocation: "",
    tripName: "",
    userID: "",
    destinationImg: "",
  }
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  userUID: string = "";
  public countries: any = [];


  constructor(public tripService: TripsService, calendar: NgbCalendar, public userService: UserService, private http: HttpClient) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.userUID = userService.getUserID();
    this.trip.userID = this.userUID;
  }

  ngOnInit(): void {
    this.countries = this.tripService.countries;
  }

  onSubmit() {
    if (this.trip.destination != " " && this.trip.startLocation != " "
      && this.trip.startLocation != " ") {
      this.trip.startDate = `${this.fromDate.month}/${this.fromDate.day}/${this.fromDate.year}`;
      this.trip.endDate = `${this.toDate?.month}/${this.toDate?.day}/${this.toDate?.year}`;
      this.tripService.addTrip(this.trip);
      this.trip = {
        destination: "",
        endDate: "",
        startDate: "",
        startLocation: "",
        tripName: "",
        destinationImg: "",
      }
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
}