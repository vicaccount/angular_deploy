import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthTwitterPageRoutingModule } from './auth-twitter-routing.module';

import { AuthTwitterPage } from './auth-twitter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthTwitterPageRoutingModule
  ],
  declarations: [AuthTwitterPage]
})
export class AuthTwitterPageModule {}
