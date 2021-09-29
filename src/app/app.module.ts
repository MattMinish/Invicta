import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { TripCardComponent } from './cards/trip-card/trip-card.component';
import { TrippageComponent } from './trippage/trippage.component';

@NgModule({
  declarations: [
    AppComponent,
    
    HomepageComponent,
    NavbarComponent,
    AboutComponent,
    LoginComponent,
    TripCardComponent,
    TrippageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
