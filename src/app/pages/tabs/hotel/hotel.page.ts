import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/shared/servicios/hotel.service';
import { Hotel } from '../../../models/hotel_model';
import { LoadingController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { from, BehaviorSubject } from 'rxjs';
import { PresupuestoService } from 'src/app/shared/presupuesto.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.page.html',
  styleUrls: ['./hotel.page.scss'],
})
export class HotelPage implements OnInit {

  hoteles = [];
  hotelesFiltrados = [];
  destinos: any[];
  isLoading: boolean;
  pxdHotel: BehaviorSubject<number>;
  // En caso de que no haya una imagen disponible en objeto Hotel
  imagenRespaldo = 'https://worldfoodtravel.org/wp-content/uploads/2019/06/no-image.jpg';

  constructor(
    private loadingCtrl: LoadingController,
    private hotelService: HotelService,
    private presupuestoService: PresupuestoService
  ) { }

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.pxdHotel = this.presupuestoService.getPresupuestoHotel();
  }

  async cargarData() {
    await this.hotelService.getHotels().snapshotChanges().subscribe((hotelesSnapshot) => {
      this.hoteles = [];
      hotelesSnapshot.forEach((hotelData: any) => {
        const data = hotelData.payload.doc.data();
        const id = hotelData.payload.doc.id;
        this.hoteles.push({
          id, ...data,
        });
      });
      const hoteles = from(this.hoteles);
      console.log(this.pxdHotel);
      this.pxdHotel.subscribe(t => {
        if (t === 0) {
          console.log(t);
          return this.hotelesFiltrados = this.hoteles;
        } else {
          this.hotelesFiltrados = [];
          const hotelesFiltrados = hoteles.pipe(filter(h => h.precio_noche <= t));
          hotelesFiltrados.subscribe(h => {
            this.hotelesFiltrados.push(h);
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
