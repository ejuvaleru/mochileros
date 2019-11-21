import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/shared/servicios/hotel.service';
import { Hotel } from 'src/app/models/hotel_model';
import { NavController } from '@ionic/angular';
import { CiudadesService } from 'src/app/shared/servicios/ciudades.service';
import { Location } from '@angular/common';
import { Destino } from 'src/app/models/destino_model';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  hotel: Hotel;
  destino: Destino;
  idHotel: string;
  imagenRespaldo = 'https://worldfoodtravel.org/wp-content/uploads/2019/06/no-image.jpg';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private hotelService: HotelService,
    private ciudadService: CiudadesService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('hotelId')) {
        this.navCtrl.navigateBack('/home/tabs/tab2/');
        return;
      }
      this.idHotel = paramMap.get('hotelId');

      this.hotelService.getHotel(this.idHotel).valueChanges().subscribe((h: Hotel) => {
        console.log(h);
        this.hotel = h;
        this.ciudadService.getCiudad(this.hotel.destinoReference).valueChanges().subscribe((d: Destino)=>{
          this.destino = d;
        }); 
      });
    });
  }

  onImgError(event) {
    event.target.src = this.imagenRespaldo;
  }
}
