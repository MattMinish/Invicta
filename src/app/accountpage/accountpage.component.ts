import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { TripsService } from 'src/app/services/trips.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.css'],
  providers: [MessageService]
})
export class AccountpageComponent implements OnInit {

  user$!: Observable<User | null | undefined>;
  // constructor(public userService: UserService) { }

  // ngOnInit(): void {
  // }

  constructor(public userService: UserService, public messageService: MessageService) { }

  ngOnInit(): void {
  }

  sendMessage(body: any) {
    console.log(body)
    this.messageService.sendMessage(body)
    //this.messageService.sendMessage(body)
  }
}
