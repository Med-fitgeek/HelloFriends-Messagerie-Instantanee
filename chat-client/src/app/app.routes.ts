import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ChatLayoutComponent } from './components/chat-layout-component/chat-layout-component';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'chat', component: ChatLayoutComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' } // ← DERNIER
];

