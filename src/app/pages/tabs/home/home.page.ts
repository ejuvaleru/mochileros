import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;

  constructor(
    private authService: AuthService,
  ) {}
  
  ngOnInit() {
    // console.log(this.authService.isLoggedIn());
    this.authService.userDetails().subscribe(user =>{
      this.user = user
    });
  }
}
