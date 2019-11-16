import { Injectable } from '@angular/core';
import { UserFromFirebase } from '../models/usuario_from_fire_model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuariosSubject = new Subject<UserFromFirebase[]>();

  private usuarioCollection: AngularFirestoreCollection<UserFromFirebase>;
  public usuarios: Observable<UserFromFirebase[]>;

  constructor(
    public afs: AngularFirestore,
    public authService: AuthService
  ) {
    this.usuarioCollection = this.afs.collection('users');
    this.usuarios = this.usuarioCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getUsuarios() {
    return this.usuarios;
  }

  getUsuario(id: string) {
    return this.usuarioCollection.doc<UserFromFirebase>(id).valueChanges();
  }

  updateUsuario(documentId: string, data: UserFromFirebase) {
    return this.afs.collection('users').doc(documentId).update({displayName: data.displayName, phoneNumber: data.phoneNumber});
  }
}
