import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home.component').then((m) => m.HomeComponent);
    }
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./about/about.component').then((m) => m.AboutComponent);
    }
  },
  {
    path: 'auth/login',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./login/login.component').then((m) => m.LoginComponent);
    }
  }
];
