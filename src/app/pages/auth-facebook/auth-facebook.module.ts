import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthFacebookPageRoutingModule } from './auth-facebook-routing.module';

import { AuthFacebookPage } from './auth-facebook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthFacebookPageRoutingModule
  ],
  declarations: [AuthFacebookPage]
})
export class AuthFacebookPageModule {}
