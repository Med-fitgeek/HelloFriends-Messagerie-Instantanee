import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () => import('./chat/chat/chat.component').then(m => m.ChatComponent)
  },
  { path: '**', redirectTo: 'login' } // ← DERNIER
];

