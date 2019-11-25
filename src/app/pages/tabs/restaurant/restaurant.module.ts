import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RestaurantPage } from './restaurant.page';
import { HideHeaderRestaurantesDirective } from 'src/app/utils/hide-header-restaurantes.directive';

const routes: Routes = [
  {
    path: '',
    component: RestaurantPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RestaurantPage, HideHeaderRestaurantesDirective]
})
export class RestaurantPageModule {}
