// import { Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login';
// import { RegisterComponent } from './components/register/register';
// import { PostsComponent } from './components/posts/posts';
// import { ProfileComponent } from './components/profile/profile';

// export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'posts', component: PostsComponent },
//   { path: 'profile', component: ProfileComponent },
// ];

// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { PostsComponent } from './components/posts/posts'; // Asumo el nombre
import { ProfileComponent } from './components/profile/profile'; // Asumo el nombre
import { authGuard } from './services/auth.guard'; // 👈 Importa el Guard

export const routes: Routes = [
    // Rutas públicas
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    
    // 🛡️ Rutas Protegidas
    { path: 'publicaciones', component: PostsComponent, canActivate: [authGuard] },
    { path: 'perfil', component: ProfileComponent, canActivate: [authGuard] },
    
    // Redirección por defecto
    { path: '', redirectTo: 'publicaciones', pathMatch: 'full' },
];