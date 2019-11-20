import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private ciudadesCollection: AngularFirestoreCollection<any>;
  private listaDeCiudades: Observable<any[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.ciudadesCollection = this.afs.collection('destinos');

    this.listaDeCiudades = this.ciudadesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getCiudades() {
    return this.listaDeCiudades;
  }

  getCiudad(id: string) {
    return this.ciudadesCollection.doc<any>(id).valueChanges();
  }
}
