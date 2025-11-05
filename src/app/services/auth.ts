import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Asegúrate de que esta sea la ruta base correcta para tu backend
  private apiUrl = '/api/auth'; 

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<any> { 
    // POST /api/auth/register
    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  /**
   * Envía las credenciales e integra el guardado de sesión si es exitoso.
   */
  login(data: any): Observable<any> {
    // POST /api/auth/login
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        // 🟢 INTEGRAMOS TU LÓGICA DE GUARDADO AQUÍ
        const token = response.token || response.access_token;
        const user = response.user; 
        
        if (token && user) {
          // Llama a tu función saveSession para guardar el token y el usuario
          this.saveSession(token, user); 
        }
      })
    );
  }

  /**
   * Tu función original para guardar el token y el usuario en Local Storage.
   * Modificada para usar la clave 'Token' para el token (visto en tu captura)
   * y 'user' para el objeto del usuario.
   */
  saveSession(token: string, user: any) {
    // ⚠️ CRÍTICO: Usamos 'Token' para la clave del JWT, que es lo que usa tu sistema
    localStorage.setItem('Token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * 🟢 Nuevo método clave para el Auth Guard.
   * Verifica la existencia del Token para proteger las rutas.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('Token'); 
  }

  /**
   * Tu función original para obtener el objeto del usuario.
   */
  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  /**
   * Tu función original para limpiar Local Storage.
   * Asegura que todas las claves relacionadas con la sesión sean borradas.
   */
  logout() {
    localStorage.removeItem('Token'); // Borra la clave del token
    localStorage.removeItem('user');  // Borra la clave del usuario
    // Si usaste localStorage.clear() antes, este es más específico
  }
}