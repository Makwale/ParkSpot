import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, AmplifyAuthenticatorModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
