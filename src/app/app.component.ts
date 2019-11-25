import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DarkmodeService } from './shared/darkmode.service';
import { PresupuestoService } from './shared/presupuesto.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authSerivce: AuthService,
    private darkModeService: DarkmodeService,
    private presupuestoService: PresupuestoService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const dark = localStorage.getItem('dark');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if (dark === 'true' && prefersDark.matches === true) {
        this.darkModeService.enableDarkMode();
      }
    });
  }

  logOut() {
    this.authSerivce.signOut().then(() => {
      this.presupuestoService.resetPresupuesto();
      this.presupuestoService.getPresupuestoHotel().unsubscribe();
      this.presupuestoService.getPresupuestoComida().unsubscribe();
      this.presupuestoService.getPresupuestoDiversion().unsubscribe();
      this.router.navigateByUrl('login', { replaceUrl: true });
    });
  }

}
