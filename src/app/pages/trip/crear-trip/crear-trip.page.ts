import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { TripDb } from 'src/app/models/trip_model';
import { TripService } from 'src/app/shared/trip.service';
import { Router } from '@angular/router';
import { CiudadesService } from 'src/app/shared/servicios/ciudades.service';

@Component({
  selector: 'app-crear-trip',
  templateUrl: './crear-trip.page.html',
  styleUrls: ['./crear-trip.page.scss'],
})
export class CrearTripPage implements OnInit {

  tripForm: FormGroup;
  uid = '';
  cargando = false;
  destinos = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tripService: TripService,
    private ciudadService: CiudadesService
  ) { }

  ngOnInit() {
    this.setUpFrom();
    if (this.authService.isLoggedIn()) {
      this.uid = JSON.parse(localStorage.getItem('user'));
    }
    this.getDestinos();
  }

  getDestinos() {
    this.ciudadService.getCiudades().snapshotChanges().subscribe((destinoSnapshot) => {
      this.destinos = [];
      destinoSnapshot.forEach(destino => {
        const data = destino.payload.doc.data();
        const id = destino.payload.doc.id;
        this.destinos.push(
          { id, ...data }
        );
      });
    });
  }

  setUpFrom() {
    this.tripForm = this.fb.group({
      lugar: ['', []],
      fechaI: ['', []],
      fechaF: ['', []],
      hotelP: ['', [Validators.required]],
      comidaP: ['', [Validators.required]],
      diversionP: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.cargando = true;
    const formTrip = this.tripForm.value;
    const tripData: TripDb = {
      uid: this.uid,
      fechaIni: formTrip.fechaI,
      fechaFin: formTrip.fechaF,
      budgetHotel: formTrip.hotelP,
      budgetComida: formTrip.comidaP,
      budgetDiversion: formTrip.diversionP,
      place: formTrip.lugar
    };
    this.tripService.crearTrip(tripData).then(r => {
      console.log(r);
      this.cargando = false;
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }).catch(err => {
      console.log(err);
    });

  }

}
