import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hotel } from 'src/app/models/hotel_model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  // private hotelesCollection: AngularFirestoreCollection<Hotel>;
  // private listaDeHoteles: Observable<Hotel[]>;

  constructor(
    private afs: AngularFirestore
  ) { }

  // Obtener hoteles
  getHotels() {
    return this.afs.collection('hoteles');;
  }

  // Obtener hotel por ID
  getHotel(id: string) {
    return this.afs.collection('hoteles').doc(id);
  }
}
