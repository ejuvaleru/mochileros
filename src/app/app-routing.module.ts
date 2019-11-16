import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SecurePagesGuard } from './shared/guards/secure-pages.guard';
import { SecureAuthGuard } from './shared/guards/secure-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tutorial', pathMatch: 'full' },
  { path: 'tutorial', loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialPageModule), canActivate: [SecurePagesGuard] },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), canActivate: [SecurePagesGuard] },
  { path: 'home', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [SecureAuthGuard] },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule', canActivate: [SecureAuthGuard] },
  { path: 'configuracion', loadChildren: './pages/configuracion/configuracion.module#ConfiguracionPageModule', canActivate: [SecureAuthGuard] },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
