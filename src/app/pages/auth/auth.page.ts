import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private servicioAuth: AuthService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params=>{
      console.log(params);

      const codigo = params.code;

      if(!codigo){
        this.servicioAuth.getInstagramToken(codigo).subscribe(resp=>{
          console.log(resp);
        });
      }
    });
  }

}
