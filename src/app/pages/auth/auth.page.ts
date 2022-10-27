import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public urlAuth = '';
  public code = '';
  public token = '';

  constructor
    (
      private activeRoute: ActivatedRoute,
      private servicioAuth: AuthService
    ) {
    this.urlAuth = this.servicioAuth.authenticationUrl;
    console.log(this.urlAuth);
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      console.log('Parámetros ', params);
      if (params.code) {
        this.code = params.code;
        // this.servicioAuth.getAccessId(params.code);
      }
    });
  }

}
