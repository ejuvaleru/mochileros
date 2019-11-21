import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  constructor(
    private afs: AngularFirestore
  ) { }

  getCiudades() {
    return this.afs.collection('destinos');;
  }

  getCiudad(id: string) {
    return this.afs.collection('destinos').doc(id);
  }
}
