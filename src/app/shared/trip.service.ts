import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TripDb } from '../models/trip_model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsCollection: AngularFirestoreCollection<TripDb>; // Colección en Firestore de TripDb
  listaTrips: Observable<TripDb[]>; // Referencia a una lista trips
  
  constructor(
    private afs: AngularFirestore,
  ) { }

  crearTrip(trip: TripDb) {
    return this.afs.collection('trips').add(trip);
  }

  editarTrip(tripId: string, data) {
    this.afs.collection('trips').doc(tripId).update(data);
  }

  eliminarTrip(tripId: string) {
    this.afs.collection('trips').doc(tripId).delete();
  }

  // Obtener trips por usuario
  getTrips(uid: string) {
    this.tripsCollection = this.afs.collection('trips', ref => ref.where('uid', '==', uid));
    this.listaTrips = this.tripsCollection.snapshotChanges().pipe(map(res => {
      return res.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getTrip(id: string){
    return this.afs.collection('trips').doc(id);
  }
}
