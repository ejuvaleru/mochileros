import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { TripDb } from 'src/app/models/trip_model';
import { TripService } from 'src/app/shared/trip.service';
import { Router } from '@angular/router';
import { CiudadesService } from 'src/app/shared/servicios/ciudades.service';
import { filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertController } from '@ionic/angular';
import { PresupuestoService } from 'src/app/shared/presupuesto.service';

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

  fechaActual: Date;
  fechaMinima;
  fechaFinal: Date;
  trips = [];
  siPuedo = false;

  fecha = [];

  constructor(
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tripService: TripService,
    private ciudadService: CiudadesService,
    private presupuestoService: PresupuestoService,
  ) { }

  ngOnInit() {
    this.fechaActual = new Date();
    this.fechaMinima = this.fechaActual.toISOString().split('T')[0];;
    console.log(this.fechaMinima);
    this.setUpFrom();
    if (this.authService.isLoggedIn()) {
      this.uid = JSON.parse(localStorage.getItem('user'));
      this.tripService.getTrips(this.uid);
      this.tripService.listaTrips.subscribe((data) => {
        // console.log('TRIPS FROM CREAR ', data);
        this.trips = data;
        this.trips.forEach(t => {
          this.fechaActual = new Date();
          this.fechaFinal = new Date(t.fechaFin);
          if (this.fechaFinal >= this.fechaActual) {
            this.siPuedo = false;
            // console.log('Fecha FINAL', this.fechaFinal);
            // console.log('Fecha ACUTAL', this.fechaActual);
            // console.log('NO PUEDES TENER MÁS DE UN VIAJE ACTIVO');
            // console.log('PUEDO 1? ', this.siPuedo);
            return;
          } else {
            this.siPuedo = true;
            // console.log('PUEDO 2?', this.siPuedo);
          }
        });
      });
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
    this.fechaFinal = new Date(tripData.fechaFin);
    const dias = this.fechaFinal.getDate() - this.fechaActual.getDate();
    if (dias <= 0) {
      this.presentAlert('Por favor selecciona una fecha de finalización mayor a la de inicio.');
      return;
    }
    if (this.siPuedo) {
      this.tripService.crearTrip(tripData).then(r => {
        this.cargando = false;
        this.router.navigateByUrl('/home', { replaceUrl: true });
        this.fechaFinal = new Date(tripData.fechaFin);
        const dias = this.fechaFinal.getDate() - this.fechaActual.getDate();
        this.calcularPresupuesto(dias, tripData.budgetHotel, tripData.budgetComida, tripData.budgetDiversion);
      }).catch(err => {
        console.log(err);
        this.presentAlert(err.message);
      });
    } else {
      this.presentAlert('No puedes crear un Trip cuando tienes uno activo. Elimina o espera a que tu Trip actual acabe.');
    }
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Mensaje del Sistema',
      message: mensaje,
      buttons: ['Entendido'],
    });

    await alert.present();
  }

  calcularPresupuesto(dias, pHotel, pComida, pDiversion) {
    const pH = (pHotel / dias);
    const pC = (pComida / dias);
    const pD = (pDiversion / dias);
    console.log('pH', pH);
    console.log('pC', pC);
    console.log('pD', pD);
    this.presupuestoService.setPrespuestoHotel(pH);
    this.presupuestoService.setPrespuestoComida(pC);
    this.presupuestoService.setPrespuestoDiversion(pD);
  }

}
