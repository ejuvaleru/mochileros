import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from 'src/app/shared/auth.service';
import { Chart } from 'chart.js';
import { TripService } from 'src/app/shared/trip.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;

  user: any;
  private doughnutChart: Chart;

  constructor(
    private authService: AuthService,
    private tripService: TripService
  ) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(user => {
      this.user = user
    });
    this.crearGrafico();
  }

  crearGrafico() {

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Hospedaje", "Comida", "Diversión"],
        datasets: [
          {
            label: "pesos",
            data: [10000, 3000, 4000],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });
  }
}
