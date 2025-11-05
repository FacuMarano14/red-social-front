// src/app/services/auth.guard.ts

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth'; // Asegura la ruta correcta

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Token encontrado, acceso permitido
  } else {
    // No hay token, redirigir al login
    router.navigate(['/login']); 
    return false; // Bloquea la activación de la ruta
  }
};