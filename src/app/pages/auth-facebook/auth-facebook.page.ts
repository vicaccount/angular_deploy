import { SocialAuthService, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IMensajeAnonimo } from '../../interfaces/mensaje-anonimo';
import { MensajeAnonimoService } from '../../services/mensaje-anonimo.service';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { DocumentReference } from '@angular/fire/firestore';
@Component({
  selector: 'app-auth-facebook',
  templateUrl: './auth-facebook.page.html',
  styleUrls: ['./auth-facebook.page.scss'],
})

export class AuthFacebookPage implements OnInit {

  @ViewChild('popover') popover;
  public twitterUser: any;
  public facebookUser: any;
  public instagramUser: any;
  public contenidoMensajeAnonimo: string = '';
  public isOpen = false;
  public redes = false;
  public noContenido = false;
  private UltimoMensajeId = '';


  constructor
    (
      private authService: SocialAuthService,
      private servicioMensajeA: MensajeAnonimoService,
      private alertController: AlertController,
      private toastController: ToastController,
      public popoverController: PopoverController
    ) { }

  ngOnInit() {

  }

  facebookLogin(): void {

    this.isOpen = false;

    if (!this.facebookUser) {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((resp) => {
        this.facebookUser = resp;
        console.log(this.facebookUser);
      }).catch(() => { });
    } else {
      console.log('Ya estás logueado con facebook');
    }
  }

  logout(): void {
    if (this.facebookUser) {
      this.authService.signOut().then((resp) => {
        console.log('logout', resp)
      }).catch(() => { });
    } else {
      console.log('No hay usuario loguedo');
    }
  }

  enviarMensajeA() {

    const mensajesAnonimo: IMensajeAnonimo = {
      idAutor: '',
      idDestinatario: 'U5u9aGm6dSWQQL5sOEsufMCCo383',
      usuarioFacebook: this.facebookUser ? this.facebookUser.name : '',
      usuarioTwitter: this.twitterUser ? this.twitterUser.name : '',
      usuarioInstagram: this.instagramUser ? this.twitterUser.name : '',
      contenido: this.contenidoMensajeAnonimo,
      fechaCreacion: new Date().getTime()
    }

    this.servicioMensajeA.addMensajeAnonimo(mensajesAnonimo).then((resp) => {
      this.toastMensajeAEnviado().then(() => {
        console.log(resp);
        this.noContenido = false;
        this.contenidoMensajeAnonimo = '';
        this.UltimoMensajeId = resp.id;
        console.log('Id del último mensaje ', this.UltimoMensajeId);

        if (mensajesAnonimo.usuarioFacebook == '' && mensajesAnonimo.usuarioTwitter == '' && mensajesAnonimo.usuarioInstagram == '') {
          // alert('Si te logueas es posible que recibas una respuesta del creador');
          this.alertNoLogin();
        } else {
          this.facebookUser, this.twitterUser, this.instagramUser = null;
        }
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  actualizarMensajeA() {
    this.redes = true;
    const userNameF = this.facebookUser ? this.facebookUser.name : '';
    const userNameT = this.twitterUser ? this.twitterUser.name : '';
    const userNameI = this.instagramUser ? this.instagramUser.name : '';

    if (this.facebookUser || this.twitterUser || this.instagramUser) {
      this.servicioMensajeA.updateMensajeAnonimo(this.UltimoMensajeId, userNameF, userNameT, userNameI).then(() => {
        this.redes = false;
        this.toastRedesAgregadas();
      });
    } else {
      this.isOpen = true;
    }
  }


  // Alerts
  public async alertEnviarMensajeA() {

    if(this.contenidoMensajeAnonimo === ''){
      this.noContenido = true;
      return
    }
    const alert = await this.alertController.create({
      header: 'Mensaje anónimo',
      subHeader: '¿Quieres enviar este mensaje?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            this.enviarMensajeA();
          }
        }
      ]
    });

    await alert.present();
  }

  public async alertNoLogin() {

    const alert = await this.alertController.create({
      header: 'No has agregado tus redes',
      message: 'Si Inicias sesión con alguna red social podrás recibir una respuesta de creador ¿Quieres agregar alguna red social al mensaje que acabas de enviar?',
      backdropDismiss: true,
      buttons: [
        {
          text: 'No gracias',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            this.isOpen = true;
            this.actualizarMensajeA();
          }
        }
      ]
    });

    await alert.present();
  }

  // Toasts
  public async toastMensajeAEnviado() {
    const toast = await this.toastController.create({
      message: 'Mensaje anónimo enviado',
      duration: 3000,
      position: 'top',
      mode: 'md',
      icon: 'paper-plane-sharp',
      cssClass: 'toast-mensaje-anonimo'

    });

    await toast.present();
  }

  public async toastRedesAgregadas() {
    const toast = await this.toastController.create({
      message: 'Redes agregadas',
      duration: 3000,
      position: 'top',
      mode: 'md',
      icon: 'checkmark-sharp',
      cssClass: 'toast-mensaje-anonimo'

    });

    await toast.present();
  }

  // Popovers
  // public async popoverNoLogin(e: Event) { 
  //   this.popover.event = e;
  //   this.isOpen = true;
  // }
}




