import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private afs: AngularFirestore
  ) { }

  // Obtener actividades / diversion
  getRestaurantes() {
    return this.afs.collection('restaurantes');
  }

  // Obtener actividad por ID
  getRestaurant(id: string) {
    return this.afs.collection('restaurantes').doc(id);
  }
}
