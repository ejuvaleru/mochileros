import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  // Variables que controlal el valor de los presupuestos asignados
  presupuestoHotel = new BehaviorSubject(0);
  presupuestoComida = new BehaviorSubject(0);
  presupuestoDiversion = new BehaviorSubject(0);

  constructor() { }

  // Get y set presupuesto hotel
  getPresupuestoHotel() {
    return this.presupuestoHotel;
  }
  setPrespuestoHotel(p: number) {
    this.presupuestoHotel.next(p);
  }

  // Get y set presupuesto comida
  getPresupuestoComida() {
    return this.presupuestoComida;
  }
  setPrespuestoComida(p: number) {
    this.presupuestoComida.next(p);
  }

  // Get y set presupuesto diversion
  getPresupuestoDiversion() {
    return this.presupuestoDiversion;
  }
  setPrespuestoDiversion(p: number) {
    this.presupuestoDiversion.next(p);
  }

  // Resetear todo a 0 (cuando se elimina por ejemplo el Trip)
  resetPresupuesto() {
    this.presupuestoHotel.next(0);
    this.presupuestoComida.next(0);
    this.presupuestoDiversion.next(0);
  }

  calcularPresupuesto(dias, pHotel, pComida, pDiversion) {
    const pH = (pHotel / dias);
    const pC = (pComida / dias);
    const pD = (pDiversion / dias);
    console.log('pH', pH);
    console.log('pC', pC);
    console.log('pD', pD);
    this.setPrespuestoHotel(pH);
    this.setPrespuestoComida(pC);
    this.setPrespuestoDiversion(pD);
  }

}
