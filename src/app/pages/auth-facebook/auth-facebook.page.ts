import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FacebookService } from '../../services/facebook.service';
@Component({
  selector: 'app-auth-facebook',
  templateUrl: './auth-facebook.page.html',
  styleUrls: ['./auth-facebook.page.scss'],
})

export class AuthFacebookPage implements OnInit {

  public twitterUser: any;
  public facebookUser: any;
  public instagramUser: any;

  constructor
    (
      private authService: SocialAuthService,
    ) { }

  facebookLogin(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((resp) => {
      this.facebookUser = resp;
      console.log(this.facebookUser);
      this.facebookLogout();
    }).catch(() => {});
  }

  facebookLogout(): void {
    this.authService.signOut().catch(() => {});
  }

  ngOnInit() {

  }

}
