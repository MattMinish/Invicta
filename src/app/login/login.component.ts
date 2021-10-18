import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  /** Keeps the subscription to the user object */
  /** Keeps the subscription to the user object */


  private userSubscription!: Subscription;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    // If a user comes back from this subscription, forward them on to the chirp page
    this.userSubscription = this.userService.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['login']);
      }
    });

  }

  ngOnDestroy() {
    // Clean up the subscription if this template is destroyed
    this.userSubscription.unsubscribe();
  }

}
