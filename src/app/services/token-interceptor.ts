import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // 1. Obtener el token de Local Storage
    const authToken = localStorage.getItem('Token'); 

    // 2. Clonar la solicitud y añadir la cabecera de Autorización
    if (authToken) {
      const authRequest = request.clone({
        setHeaders: {
          // El esquema 'Bearer' es el estándar para JWT
          Authorization: `Bearer ${authToken}` 
        }
      });
      // Continuar con la solicitud modificada
      return next.handle(authRequest);
    }

    // 3. Si no hay token, continuar con la solicitud original (para login/register)
    return next.handle(request);
  }
}