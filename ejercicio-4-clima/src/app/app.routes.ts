import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page')
        .then((m) => m.HomePage)
  },
  {
    path: 'clima',
    loadComponent: () =>
      import('./pages/clima/clima.page')
        .then((m) => m.ClimaPage)
  },
  {
    path: 'clima-fotografia-page',
    loadComponent: () => 
      import('./pages/clima-fotografia-page/clima-fotografia-page.page')
        .then( m => m.ClimaFotografiaPagePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];