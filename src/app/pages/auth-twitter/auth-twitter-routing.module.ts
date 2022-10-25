import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthTwitterPage } from './auth-twitter.page';

const routes: Routes = [
  {
    path: '',
    component: AuthTwitterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthTwitterPageRoutingModule {}
