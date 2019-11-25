import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { DiversionService } from 'src/app/shared/servicios/diversion.service';
import { PresupuestoService } from 'src/app/shared/presupuesto.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-fun',
  templateUrl: './fun.page.html',
  styleUrls: ['./fun.page.scss'],
})
export class FunPage implements OnInit {

  actividades = [];
  actividadesFiltradas = [];
  destinos: any[];
  isLoading: boolean;
  pPromedio: BehaviorSubject<number>;

  // En caso de que no haya una imagen disponible en objeto Hotel
  imagenRespaldo = 'https://worldfoodtravel.org/wp-content/uploads/2019/06/no-image.jpg';

  constructor(
    private loadingCtrl: LoadingController,
    private actividadesService: DiversionService,
    private presupuestoService: PresupuestoService,
  ) { }

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.pPromedio = this.presupuestoService.getPresupuestoDiversion();
  }


  async cargarData() {
    await this.actividadesService.getActividades().snapshotChanges().subscribe((actividadesSnapshot) => {
      this.actividades = [];
      actividadesSnapshot.forEach((resData: any) => {
        const data = resData.payload.doc.data();
        const id = resData.payload.doc.id;
        this.actividades.push({
          id, ...data,
        });
      });
      const actividades = from(this.actividades);
      this.pPromedio.subscribe(t => {
        if (t === 0) {
          console.log('PROM ', t);
          return this.actividadesFiltradas = this.actividades;
        } else {
          this.actividadesFiltradas = [];
          const restaurantesFiltrados = actividades.pipe(filter(a => a.precio_promedio <= t));
          restaurantesFiltrados.subscribe(r => {
            this.actividadesFiltradas.push(r);
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
