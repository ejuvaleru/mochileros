import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FunPage } from './fun.page';
import { HideHeaderActividadesDirective } from 'src/app/utils/hide-header-actividades.directive';

const routes: Routes = [
  {
    path: '',
    component: FunPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FunPage, HideHeaderActividadesDirective]
})
export class FunPageModule {}
