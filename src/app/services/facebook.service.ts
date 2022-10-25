import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const clientSecret = environment.facebookAppConfig.clientSecret;
const clientId = environment.facebookAppConfig.clientId;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  private hostUrl = 'https://www.facebook.com/v15.0';
  private hostUrlApi = 'https://graph.facebook.com/v15.0';
  private hostLogoutUrl = 'https://www.facebook.com/logout.php';
  private redirectUri = 'https://angulardeploy-410ae.web.app/auth-facebook';
  private state = '{st=state123abc,ds=123456789}';
  public linkVentana = '';

  constructor(private http: HttpClient) {
    this.createLinkVentana();
  }


  private createLinkVentana() {
    this.linkVentana = `${this.hostUrl}/dialog/oauth?client_id=${clientId}&redirect_uri=${this.redirectUri}&state=${this.state}`;
  }

  public getAccessToken(code: string) {
    return this.http.get(`
    ${this.hostUrlApi}/oauth/access_token?client_id=${clientId}&redirect_uri=${this.redirectUri}&client_secret=${clientSecret}&code=${code}`);
  }

  public getFacebookUserName(token: string){
    return this.http.get(`${this.hostUrlApi}/me?fields=id,name&access_token=${token}`);
  }

  public logoutFromFacebook(accessToken: string){
    // return this.http.get(`${this.hostLogoutUrl}?next=${this.redirectUri}&access_token=${accessToken}`);
    return `${this.hostLogoutUrl}?next=${this.redirectUri}&access_token=${accessToken}`;
  }
}
