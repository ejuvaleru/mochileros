import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  slideOpts = {
    pager: true,
  };

  slides = [
    { texto: 'Planea, organiza y ahorra dinero', url: 'assets/images/money.svg', numero: 1 },
    { texto: 'Los mejores lugares para hospedarte', url: 'assets/images/hotel.svg', numero: 2 },
    { texto: 'La mejor comida regional', url: 'assets/images/eating.svg', numero: 3 },
    { texto: 'Las actividades más divertidas', url: 'assets/images/biking.svg', numero: 4 },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateLogin() {
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

}
