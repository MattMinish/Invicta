import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TripCardComponent } from './cards/trip-card/trip-card.component';
import { TrippageComponent } from './trippage/trippage.component';
import { AccountpageComponent } from './accountpage/accountpage.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  {path: 'trips', component: TrippageComponent},
  {path: 'account', component: AccountpageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
