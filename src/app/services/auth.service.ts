import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getInstagramToken(codigo: string) {
    return this.http.post(`https://api.instagram.com/oauth/access_token`,
      {
        "client_id": '1094968974513195',
        "client_secret": '7049f254d5349c0638a584c67e0119d0',
        "code": codigo,
        "grant_type": 'authorization_code',
        "redirect_uri": 'https://angulardeploy-410ae.web.app/auth'
      });
  }
}
