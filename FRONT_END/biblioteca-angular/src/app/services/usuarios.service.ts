// ==========================================================
// Semana 3 - libros.service.ts
// Servicio encargado de comunicarse con el backend (API REST)
// ==========================================================
//
// Este servicio centraliza todas las operaciones CRUD de libros.
// Es decir, aquí definimos cómo el frontend interactúa con el backend.
//
// En Semana 3 estamos trabajando:
// - Consumo de API REST
// - Separación de responsabilidades (componente vs servicio)
// - Uso de HttpClient y Observables
//

import { Injectable } from '@angular/core';
// Permite que este servicio sea inyectado en cualquier componente.

import { HttpClient } from '@angular/common/http';
// Cliente HTTP de Angular para hacer peticiones al backend.

import { Observable } from 'rxjs';
// Representa datos asíncronos (respuestas del backend).

import { Usuario } from '../models/usuario';
// Modelo de datos que representa un usuario en la aplicación.

@Injectable({
  providedIn: 'root'
})
// Hace que el servicio esté disponible globalmente en toda la app.
export class UsuariosService {

  // URL base del backend (API de usuarios)
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}
  // Inyectamos HttpClient para poder hacer solicitudes HTTP.

  // ==========================================================
  // GET → Obtener todos los usuarios
  // ==========================================================
  getUsuarios(): Observable<Usuario[]> {
    // Retorna una lista de usuarios desde el backend
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // ==========================================================
  // GET → Obtener un usuario por ID
  // ==========================================================
  getUsuarioById(id: number): Observable<Usuario> {
    // Se usa interpolación para enviar el id en la URL
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // ==========================================================
  // POST → Crear un nuevo usuario
  // ==========================================================
  createUsuario(usuario: Usuario): Observable<Usuario> {
    // Envía el objeto usuario al backend para guardarlo
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // ==========================================================
  // PUT → Actualizar un usuario existente
  // ==========================================================
  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    // Envía el usuario actualizado al backend usando su id
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  // ==========================================================
  // DELETE → Eliminar un usuario
  // ==========================================================
  deleteUsuario(id: number): Observable<void> {
    // Elimina el usuario según su id
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}