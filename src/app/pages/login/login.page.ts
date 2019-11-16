import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// Mis imports
import { AuthService } from 'src/app/shared/auth.service';
import { UsuarioNuevo } from 'src/app/models/usuario_nuevo_model';
import { UserFromFirebase } from 'src/app/models/usuario_from_fire_model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLogin: boolean = true;
  cargando: boolean = false;
  errorMessage: string = '';

  // Propiedades de login page
  loginForm: FormGroup;

  usuario: UsuarioNuevo;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Correo requerido.' },
      { type: 'email', message: 'Por favor entre un correo válido.' }
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres.' }
    ]
  };

  message_from_firebase = [
    { code: 'auth/user-not-found', message: 'Usuario no encontrado' }
  ]


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.setupForm();
  }

  // Método que instancia el formulario
  setupForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }

  // Método para iniciar sesión
  onSubmit() {
    const userFromForm = this.loginForm.value;
    if (userFromForm.email === '' && userFromForm.password === '') {
      this.errorMessage = 'Agregue un email y contraseña por favor.'
      return;
    }
    else if (userFromForm.email === '') {
      this.errorMessage = 'Agregue un correo.'
      return;
    } else if (userFromForm.password === '') {
      this.errorMessage = 'Agregue una contraseña de 8 caracteres.'
      return;
    }
    this.usuario = new UsuarioNuevo(userFromForm.email, userFromForm.password);

    // El login está por defecto, pero si el usuario es nuevo entonces salta este fragmento de código
    if (this.isLogin) {
      this.cargando = true;
      this.authService.loginWithEmailAndPassword(this.usuario).then(res => {
        console.log(res);
        this.errorMessage = "";
        this.cargando = false;
        this.router.navigateByUrl('home/tabs/tab1', { replaceUrl: true });
      }, err => {
        console.log(err);
        this.cargando = false;
        this.message_from_firebase.forEach(e => {
          if (e.code === err.code) {
            this.errorMessage = e.message;
          }
        })
      });
    } // Si el usuario selecciona registrarme, la variable booleana cambia y permite mandar este método
    else {
      this.authService.registerFromEmailAndPassword(this.usuario).then(res => {
        console.log('Register', res.user);
        this.errorMessage = "";
        const userData: UserFromFirebase = {
          uid: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          emailVerified: res.user.emailVerified,
        };
        this.authService.setUserData(userData);
        this.router.navigateByUrl('home/tabs/tab1', { replaceUrl: true });
      },
        err => {
          console.log('Error register', err);
          this.errorMessage = err.message;
        });
    }
  }

  // Método para registrarse
  onRegister() {
    this.isLogin = !this.isLogin;
    console.log('Clicked!');
  }
}
