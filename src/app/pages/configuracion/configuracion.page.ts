import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from 'src/app/shared/darkmode.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  darkMode: boolean;
  constructor(
    private darkModeService: DarkmodeService
  ) { }

  ngOnInit() {
    this.darkMode = this.darkModeService.isDark;
  }

  isDarkMode(){
    this.darkMode =! this.darkMode;
    this.darkModeService.themeMode();
  }

}
