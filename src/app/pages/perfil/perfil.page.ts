import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UserFromFirebase } from 'src/app/models/usuario_from_fire_model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: UserFromFirebase;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(user => {
      this.user = user
    });
  }

}
