import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiversionService {

  constructor(
    private afs: AngularFirestore
  ) { }

  // Obtener actividades / diversion
  getActividades() {
    return this.afs.collection('actividades');
  }

  // Obtener actividad por ID
  getActividad(id: string) {
    return this.afs.collection('actividades').doc(id);
  }
}
