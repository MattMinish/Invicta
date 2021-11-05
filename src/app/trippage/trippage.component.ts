import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { TripsService } from '../services/trips.service';


@Component({
  selector: 'app-trippage',
  templateUrl: './trippage.component.html',
  styleUrls: ['./trippage.component.css']
})
export class TrippageComponent implements OnInit {

  user$!: Observable<User | null | undefined>;
  constructor(public userService: UserService, private afs: AngularFirestore, public tripService: TripsService) {

   }

  ngOnInit(): void {
    this.tripService.getRestrictions();
  }

}
