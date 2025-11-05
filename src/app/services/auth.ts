import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  

  register(formData: FormData): Observable<any> { 
        // 🟢 Usamos la URL base y solo añadimos la parte /auth/register
        // La URL final será: https://.../api + /auth/register
        return this.http.post(`${this.apiUrl}/auth/register`, formData);
    }

    /**
     * Envía las credenciales e integra el guardado de sesión si es exitoso.
     */
    login(data: any): Observable<any> {
        // 🟢 Usamos la URL base y solo añadimos la parte /auth/login
        return this.http.post<any>(`${this.apiUrl}/auth/login`, data).pipe(
            tap(response => {
                // 🟢 INTEGRAMOS TU LÓGICA DE GUARDADO AQUÍ
                const token = response.token || response.access_token;
                const user = response.user; 
                
                if (token && user) {
                    this.saveSession(token, user); 
                }
            })
        );
    }


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