import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthFacebookPage } from './auth-facebook.page';

const routes: Routes = [
  {
    path: '',
    component: AuthFacebookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthFacebookPageRoutingModule {}
