import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { AuthService } from 'src/app/shared/auth.service';
import { Chart } from 'chart.js';
import { TripService } from 'src/app/shared/trip.service';
import { TripDb } from 'src/app/models/trip_model';
import { Router } from '@angular/router';
import { PresupuestoService } from 'src/app/shared/presupuesto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // Referencia al elemento HTML para crear la gráfica
  @ViewChild("doughnutCanvas", { static: false }) doughnutCanvas?;

  // Creamos un objeto de tipo Chart
  private doughnutChart: Chart;

  user: any;

  tripActual: TripDb;
  trips = [];
  data = [];
  a: any;
  diasRestantes: number;

  // Variables que permiten comprar si un Trip está en fecha (aún no caduca) o no
  actualDate: Date;
  finalDate: Date;

  // Variable que permite conocer si existe o no un elemento gráfico a crear, se usa en el HTML con un if
  hayGrafico = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tripService: TripService,
    private presupuestoService: PresupuestoService,
  ) { }

  ngOnInit() {
    // console.log('GRAFIO DE ON INIT ', this.hayGrafico);
    this.authService.userDetails().subscribe(user => {
      this.user = user
      this.tripService.getTrips(JSON.parse(localStorage.getItem('user')));
      this.getTrips();
      // console.log(this.tripActual);
    });
  }

  // Método para navegar a la página de crear Trip
  crearMiTrip() {
    this.router.navigateByUrl('crear-trip');
  }

  getTrips() {
    // Vaciamos la información de los arrays para sobreescribir la información que pueda estar
    this.trips = [];
    this.data = [];
    this.tripService.listaTrips.subscribe(data => {
      this.trips = data;
      this.trips.forEach((t: TripDb) => {
        // Creamos el objeto budget con los datos presupuestales del trip
        const budget = [
          t.budgetHotel,
          t.budgetComida,
          t.budgetDiversion,
        ]
        // Seteamos la fecha final obtenida de BD a nuestra variable de finalDate
        this.finalDate = new Date(t.fechaFin);
        this.actualDate = new Date();
        // Si la fecha del trip iterado [i] cumple la condición de ACTIVO, creamos el trip actual
        if (this.finalDate.getDate() >= this.actualDate.getDate()) {
          this.tripActual = t;
          this.diasRestantes = (this.finalDate.getDate() - this.actualDate.getDate());
          this.presupuestoService.calcularPresupuesto(this.diasRestantes, this.tripActual.budgetHotel, this.tripActual.budgetComida, this.tripActual.budgetDiversion);
          this.hayGrafico = true;
          // console.log('GRAFIO DE GETTRIPS ', this.hayGrafico);
          this.data.push(budget);
          // Creamos el gráfico
          this.crearGrafico(this.data);
          return;
        } else {
          this.data = [];
          // Si existe la gráfica la destruimos y seteamos a falso la bandera del gráfico
          if (this.doughnutChart) {
            this.hayGrafico = false;
            // console.log('GRAFICO GET TRIPS SI HAY DONA ', this.hayGrafico);
            this.doughnutChart.destroy();
          }
        }
      });
    });
  }

  // Con este método creamos el gráfico
  crearGrafico(data: any) {
    // Iteramos la data recibida para crear la gráfica
    data.forEach(d => {
      this.a = d;
      // Condición que permite saber si creamos o no el gráfico en caso de que no haya trips activos
      if (this.hayGrafico) {
        // console.log('GRAFIco de crear ', this.hayGrafico);
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
          type: "pie",
          data: {
            labels: ["Hospedaje", "Comida", "Diversión"],
            datasets: [
              {
                label: "pesos",
                data: this.a,
                backgroundColor: [
                  "rgba(16, 220, 96, 0.7)",
                  "rgba(112, 68, 255, 0.7)",
                  "rgba(12, 209, 232, 0.7)",
                ],
                hoverBackgroundColor: ["#10dc60", "#7044FF", "#0cd1e8"]
              }
            ]
          }
        });
      }
    });
  }

}