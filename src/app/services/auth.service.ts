import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const client_secret = environment.instagramAppConfig.clientSecret;
const client_id = environment.instagramAppConfig.clientId;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private hostUrl = 'https://api.instagram.com';
  private hostUrlAccesstoken = 'https://api.instagram.com/oauth/access_token';
  private scope = 'user_profile';
  private grant_type = 'authorization_code';
  private redirect_uri = 'https://angulardeploy-410ae.web.app/auth';
  private state = '1';
  public authenticationUrl = '';

  constructor(private http: HttpClient) {

    this.CreateAuthenticationUrl();
  }

  public getAccessId(codigo: string) {

    const body = {
      client_secret: client_secret,
      client_id: client_id,
      grant_type: this.grant_type,
      redirect_uri: this.redirect_uri,
      code: codigo
    }

    const stringifyBody = JSON.stringify(body);

    return this.http.post(this.hostUrlAccesstoken, stringifyBody);

    // console.log('Código', codigo);

    // const cabeceras = new HttpHeaders().set('Access-Control-Allow-Origin', '*').set('Content-Type', 'application/x-www-form-urlencoded');

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // };

  

    // const params = new HttpParams({
    //   fromObject: {
    //     client_id: client_id,
    //     client_secret: client_secret,
    //     grant_type: this.grant_type,
    //     redirect_uri: this.redirect_uri,
    //     code: codigo
    //   }
    // });

  }

  private CreateAuthenticationUrl() {
    this.authenticationUrl = `${this.hostUrl}/oauth/authorize?client_id=${client_id}&redirect_uri=${this.redirect_uri}&scope=${this.scope}&response_type=code&state=${this.state}`;
  }
}
