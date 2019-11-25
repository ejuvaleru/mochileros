import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { RestaurantService } from 'src/app/shared/servicios/restaurant.service';
import { PresupuestoService } from 'src/app/shared/presupuesto.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  restaurantes = [];
  restaurantesFiltrados = [];
  destinos: any[];
  isLoading: boolean;
  pPromedio: BehaviorSubject<number>;

  // En caso de que no haya una imagen disponible en objeto Hotel
  imagenRespaldo = 'https://worldfoodtravel.org/wp-content/uploads/2019/06/no-image.jpg';

  constructor(
    private loadingCtrl: LoadingController,
    private restaurantService: RestaurantService,
    private presupuestoService: PresupuestoService
  ) { }


  ngOnInit() {
    this.presentLoadingWithOptions();
    this.pPromedio = this.presupuestoService.getPresupuestoComida();
  }

  async cargarData() {
    await this.restaurantService.getRestaurantes().snapshotChanges().subscribe((resSnapshot) => {
      this.restaurantes = [];
      resSnapshot.forEach((resData: any) => {
        const data = resData.payload.doc.data();
        const id = resData.payload.doc.id;
        this.restaurantes.push({
          id, ...data,
        });
      });
      const restaurantes = from(this.restaurantes);
      console.log('PROMEDIO: ', this.pPromedio);
      this.pPromedio.subscribe(t => {
        if (t === 0) {
          console.log('PROM ', t);
          return this.restaurantesFiltrados = this.restaurantes;
        } else {
          this.restaurantesFiltrados = [];
          const restaurantesFiltrados = restaurantes.pipe(filter(r => r.precio_promedio <= t));
          restaurantesFiltrados.subscribe(r => {
            this.restaurantesFiltrados.push(r);
          });
        }
      });
    });
  }

  onImgError(event) {
    event.target.src = this.imagenRespaldo;
  }

  async presentLoadingWithOptions() {
    await this.loadingCtrl.create({
      message: 'Cargando...'
    }).then(loadingEl => {
      loadingEl.present();
      this.cargarData().then(() => {
        loadingEl.dismiss();
      });
    });
  }

}
