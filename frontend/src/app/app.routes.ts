import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./features/auth/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'ingresos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/ingresos/ingresos.component').then((m) => m.IngresosComponent),
  },
  {
    path: 'gastos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/gastos/gastos.component').then((m) => m.GastosComponent),
  },
  {
    path: 'prestamos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/prestamos/prestamos.component').then((m) => m.PrestamosComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
