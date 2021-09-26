import { Component, Input, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
     FormsModule
  ]
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!:string;
  password!:string;

  constructor() {};
  ngOnInit(): void {};

  Login(){
    if(this.username == "test" && this.password == "test"){
      console.log("u have been logged in")
    }
  }

}
