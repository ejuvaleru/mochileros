import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlideComponent } from './slide/slide.component';
import { IonicModule } from '@ionic/angular';

const myComponents = [
  SlideComponent,
];

@NgModule({
  declarations: [
    myComponents
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    myComponents
  ],
})
export class ComponentsModule { }
