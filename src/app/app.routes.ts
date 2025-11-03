import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadComponent: () => import('./components/intro/intro.component').then(m => m.IntroComponent)
  },
  {
    path: 'chat',
    loadComponent: () => import('./components/chat/chat.component').then(m => m.ChatComponent)
  },
  { path: '**', redirectTo: 'intro' }
];
