import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPage } from '../account/account.page';
import { BookingsPage } from '../bookings/bookings.page';
import { MapPage } from '../map/map.page';
import { SigninPage } from '../signin/signin.page';
import { SignupPage } from '../signup/signup.page';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'map',
        pathMatch: 'full'
      },
      {
        path: 'map',
        component: MapPage
      },
      {
        path: 'signin',
        component: SigninPage
      },
      {
        path: 'signup',
        component: SignupPage
      },
      {
        path: 'account',
        component: AccountPage
      },
      {
        path: 'bookings',
        component: BookingsPage
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
