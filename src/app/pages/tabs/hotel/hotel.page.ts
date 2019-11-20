import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/shared/servicios/hotel.service';
import { Hotel } from '../../../models/hotel_model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.page.html',
  styleUrls: ['./hotel.page.scss'],
})
export class HotelPage implements OnInit {

  hoteles: Hotel[];
  isLoading: boolean;
  imagenRespaldo = 'https://worldfoodtravel.org/wp-content/uploads/2019/06/no-image.jpg';

  constructor(
    private loadingCtrl: LoadingController,
    private hotelService: HotelService,
  ) { }

  ngOnInit() {
    this.presentLoadingWithOptions();
  }

  async cargarData() {
    this.isLoading = true;
    await this.hotelService.getHotels().subscribe(res => {
      this.hoteles = res;
      console.log(this.hoteles);
      this.isLoading = false;
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
