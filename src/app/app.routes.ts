import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { accountGuard } from './guards/account.guard';

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
    path: 'login',
    pathMatch: 'full',
    canActivate: [loginGuard],
    loadComponent: () => {
      return import('./login/login.component').then((m) => m.LoginComponent);
    }
  },
  {
    path: 'account',
    pathMatch: 'full',
    canActivate: [accountGuard],
    loadComponent: () => {
      return import('./account/account.component').then((m) => m.AccountComponent);
    }
  },
  {
    path: 'privacy-policy',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent);
    }
  }
];
