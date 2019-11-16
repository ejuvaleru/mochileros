import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { TripService } from 'src/app/shared/trip.service';
import { TripDb } from 'src/app/models/trip_model';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-mis-trips',
  templateUrl: './mis-trips.page.html',
  styleUrls: ['./mis-trips.page.scss'],
})
export class MisTripsPage implements OnInit {

  trips = [];

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private tripSerivce: TripService
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.tripSerivce.getTrips(JSON.parse(localStorage.getItem('user')));
      this.presentLoading();
    }
  }

  async presentLoading() {
    await this.loadingCtrl.create({
      message: 'Cargando...',
    }).then(loadingEl => {
      loadingEl.present();
      this.tripSerivce.listaTrips.subscribe(data => {
        this.trips = data;
        loadingEl.dismiss();
      });
    });

  }

}
