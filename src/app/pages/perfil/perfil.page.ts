import { Component, OnInit } from '@angular/core';
import { UserFromFirebase } from 'src/app/models/usuario_from_fire_model';
import { UsuarioService } from 'src/app/shared/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: UserFromFirebase;
  isEdit = false;
  cargando = false;
  profileForm: FormGroup;

  constructor(
    private userService: UsuarioService,
    private afa: AngularFireAuth,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.afa.auth.onAuthStateChanged(userData => {
      if (userData) {
        const userId = userData.uid;
        this.userService.getUsuario(userId).subscribe(user => {
          this.user = user;
          // console.log('El usuario', this.user);
          this.setupForm(this.user);
        });
      }
    });
  }

    // Método que instancia el formulario
    setupForm(user) {
      this.profileForm = this.formBuilder.group({
        nombreUsuario: [user.displayName, [Validators.required]],
        numeroTelefono: [user.phoneNumber, [Validators.required]],
      });
    }

  edit(){
    this.isEdit =! this.isEdit;
    console.log(this.isEdit);
  }

  onSubmit(){
    this.cargando = true;
    const userFromForm = this.profileForm.value;
    // console.log(userFromForm.nombreUsuario);
    const user: UserFromFirebase = {
      displayName: userFromForm.nombreUsuario,
      email: this.user.email,
      phoneNumber: userFromForm.numeroTelefono,
      photoURL: this.user.photoURL,
      emailVerified: this.user.emailVerified,
      uid: this.user.uid
    };
    this.userService.updateUsuario(this.user.uid, user).then(() => {
      this.isEdit = false;
      this.cargando = false;
    });
  }

}
