import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/shared/servicios/hotel.service';
import { Hotel } from 'src/app/models/hotel_model';
import { NavController } from '@ionic/angular';
import { CiudadesService } from 'src/app/shared/servicios/ciudades.service';
import { Location } from '@angular/common';
import { Destino } from 'src/app/models/destino_model';
import { RestaurantService } from 'src/app/shared/servicios/restaurant.service';
import { DiversionService } from 'src/app/shared/servicios/diversion.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  hotel: Hotel;
  idHotel: string;
  destino: Destino;

  restaurante: any;
  idRes: string;

  actividad: any;
  idActividad: string;

  imagenRespaldo = 'https://worldfoodtravel.org/wp-content/uploads/2019/06/no-image.jpg';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private hotelService: HotelService,
    private ciudadService: CiudadesService,
    private restauranteSerivce: RestaurantService,
    private diversionService: DiversionService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('hotelId') && !paramMap.has('resId') && !paramMap.has('actividadId')) {
        this.navCtrl.navigateBack('/');
        return;
      } else if (paramMap.has('hotelId')) {
        this.idHotel = paramMap.get('hotelId');
        this.hotelService.getHotel(this.idHotel).valueChanges().subscribe((h: Hotel) => {
          console.log(h);
          this.hotel = h;
          this.ciudadService.getCiudad(this.hotel.destinoReference).valueChanges().subscribe((d: Destino) => {
            this.destino = d;
          });
        });
      } else if (paramMap.has('resId')) {
        this.idRes = paramMap.get('resId');
        console.log(this.idRes);
        this.restauranteSerivce.getRestaurant(this.idRes).valueChanges().subscribe((r) => {
          this.restaurante = r;
        });
      } else if (paramMap.has('actividadId')) {
        this.idActividad = paramMap.get('actividadId');
        this.diversionService.getActividad(this.idActividad).valueChanges().subscribe((a) => {
          this.actividad = a;
        });
      }
    });
  }

  // Con esto asignamos una imagen en caso de que el objeto que viene no tenga una disponible
  onImgError(event) {
    event.target.src = this.imagenRespaldo;
  }
}
