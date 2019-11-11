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
    { texto: 'Organiza y ahorra dinero', url: 'assets/images/save-your-money.png', numero: 1 },
    { texto: 'Los mejores lugares para visitar', url: 'assets/images/where-to-travel.png', numero: 2 },
    { texto: 'La mejor comida regional', url: 'assets/images/local-food.png', numero: 3 },
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
