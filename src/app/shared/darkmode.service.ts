import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {

  // Variable que sirve para auxiliar el cambio de tema
  isDark: boolean;

  constructor() {}
  
  // Habilitamos el dark mode si el usuario así lo desea y guarda la configuración
  enableDarkMode(){
    document.body.classList.toggle('dark', true)
    localStorage.setItem('dark', 'true');
    this.isDark = true;
  }

  // Habilitamos el light mode si el usuario así lo desea y guarda la configuración
  enableLightMode(){
    document.body.classList.toggle('dark');
    localStorage.setItem('dark', 'false');
    this.isDark = false;
  }

  // Comparamos el valor de 'dark' para cambiar entre un tema y otro
  themeMode(){
    if(this.isDark){
      this.enableLightMode();
    }else {
      this.enableDarkMode();
    }
  }

}
