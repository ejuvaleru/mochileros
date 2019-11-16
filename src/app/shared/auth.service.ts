import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UsuarioNuevo } from '../models/usuario_nuevo_model';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UserFromFirebase } from '../models/usuario_from_fire_model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    // Importamos las clase de AFA para todo utilizar todo lo relacionado con el manejo del usuario
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.afa.authState.subscribe(user => {
      if (user) {
        // console.log('SERVICE IF USER DATA ', user);
        this.userData = user.uid;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Método para registar usuario
  registerFromEmailAndPassword(usuario: UsuarioNuevo) {
    return new Promise<any>((resolve, reject) => {
      this.afa.auth.createUserWithEmailAndPassword(usuario.correo, usuario.password)
        .then(
          res => resolve(res),
          err => reject(err))
    });
  }

  // Método para iniciar sesión
  loginWithEmailAndPassword(usuario: UsuarioNuevo) {
    return new Promise<any>((resolve, reject) => {
      this.afa.auth.signInWithEmailAndPassword(usuario.correo, usuario.password)
        .then(
          res => resolve(res),
          err => reject(err))
    });
  }

  // Método para cerrar sesión
  signOut() {
    return new Promise<any>((resolve, reject) => {
      if (this.afa.auth.currentUser) {
        this.afa.auth.signOut().then(async () => {
          localStorage.removeItem('user');
          localStorage.removeItem('dark');
          console.log("Log Out", this.isLoggedIn());
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  // Método para setear la data del usuario nuevo en Firestore
  setUserData(user: UserFromFirebase) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: UserFromFirebase = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true
    });
  }


  // Detalles/Información del usuario logueado
  userDetails() {
    return this.afa.authState;
  }

  // User logueado
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // isLoggedInOb(): Observable<boolean> {
  //   return this.isLoginSubject.asObservable();
  // }

}
