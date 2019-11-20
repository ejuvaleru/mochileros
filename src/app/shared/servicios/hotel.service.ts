import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hotel } from 'src/app/models/hotel_model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotelesCollection: AngularFirestoreCollection<Hotel>;
  private listaDeHoteles: Observable<Hotel[]>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.hotelesCollection = this.afs.collection('hoteles');

    this.listaDeHoteles = this.hotelesCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  // Obtener hoteles
  getHotels() {
    return this.listaDeHoteles;
  }

  // Obtener hotel por ID
  getHotel(id: string) {
    return this.hotelesCollection.doc<Hotel>(id).valueChanges();
  }
}
