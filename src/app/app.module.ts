import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninPage } from './pages/signin/signin.page';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { SignupPage } from './pages/signup/signup.page';
import { ParkingLotModalPage } from './pages/parking-lot-modal/parking-lot-modal.page';
import { MapPage } from './pages/map/map.page';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AccountPage } from './pages/account/account.page';
import { BookingsPage } from './pages/bookings/bookings.page';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
@NgModule({
  declarations: [
    AppComponent,
    SigninPage,
    SignupPage,
    MapPage,
    ParkingLotModalPage,
    AccountPage,
    BookingsPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AmplifyAngularModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AmplifyService,
    ModalController,
    LaunchNavigator
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
