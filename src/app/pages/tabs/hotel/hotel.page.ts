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

  hoteles = [];
  destinos: any[];
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
    await this.hotelService.getHotels().snapshotChanges().subscribe((hotelesSnapshot) => {
      this.hoteles = [];
      hotelesSnapshot.forEach((hotelData: any) => {

        const data = hotelData.payload.doc.data();
        const id = hotelData.payload.doc.id;

        this.hoteles.push({
          id, ...data,
      });
    });
    console.log(this.hoteles);
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
