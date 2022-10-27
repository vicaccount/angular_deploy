import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IMensajeAnonimo } from '../interfaces/mensaje-anonimo';

@Injectable({
  providedIn: 'root'
})
export class MensajeAnonimoService {

  private mensajesAnonimos: AngularFirestoreCollection<IMensajeAnonimo>;

  constructor
    (
      private firestore: AngularFirestore,
    ) {
    this.mensajesAnonimos = this.firestore.collection<IMensajeAnonimo>('mensajes_anonimos');
  }

  public addMensajeAnonimo(mensajeAnonimo: IMensajeAnonimo) {
   return this.mensajesAnonimos.add(mensajeAnonimo);
  }

  public async updateMensajeAnonimo(id: string, facebook: string = '', twitter: string = '', instagram: string = ''){

    const documentReference = this.mensajesAnonimos.doc(id);

    return await documentReference.update({
      usuarioFacebook: facebook,
      usuarioTwitter: twitter,
      usuarioInstagram: instagram
    });
  }

}
