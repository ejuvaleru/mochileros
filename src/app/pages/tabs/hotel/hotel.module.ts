import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HotelPage } from './hotel.page';
import { HideHeaderDirective } from 'src/app/hide-header.directive';

const routes: Routes = [
  {
    path: '',
    component: HotelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    
  ],
  declarations: [HotelPage, HideHeaderDirective]
})
export class HotelPageModule {}
