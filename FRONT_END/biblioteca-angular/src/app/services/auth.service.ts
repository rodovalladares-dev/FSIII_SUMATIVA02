/**
 * Semana 5 - Desarrollo Full Stack III
 * Servicio de autenticación simulada.
 *
 * ¿Qué hace este servicio?
 * - Mantiene usuarios simulados en memoria.
 * - Permite iniciar sesión.
 * - Guarda la sesión en localStorage.
 * - Permite cerrar sesión.
 * - Permite consultar el usuario autenticado.
 * - Permite revisar roles.
 * - Permite registrar usuarios en la lista simulada.
 *
 * ¿Por qué lo hacemos así?
 * Porque en esta semana el FrontEnd puede trabajar de forma independiente
 * usando listas y arreglos, sin obligar una conexión directa con el BackEnd.
 */

import { Injectable, signal } from '@angular/core';
import { Usuario_2, RolUsuario } from '../models/usuario_2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Clave para guardar la sesión en localStorage.
   */
  private readonly STORAGE_KEY = 'usuario_autenticado_semana5';

  /**
   * Lista base de usuarios simulados.
   * Estos datos se construyen según la información entregada
   * como referencia del sistema actual.
   */
  private usuarios: Usuario_2[] = [
    {
      id: 1,
      nombre: 'Ana Torres Actualizada',
      correo: 'ana.torres@biblioteca.cl',
      contrasena: 'Admin789',
      rol: 'ADMIN',
      activo: false,
      fechaRegistro: '2026-03-20'
    },
    {
      id: 2,
      nombre: 'Luis Herrera',
      correo: 'luis.herrera@biblioteca.cl',
      contrasena: 'Biblio123',
      rol: 'BIBLIOTECARIO',
      activo: true,
      fechaRegistro: '2026-03-17'
    },
    {
      id: 5,
      nombre: 'Pedro Muñoz',
      correo: 'pedro.munoz@biblioteca.cl',
      contrasena: 'Lectura2026',
      rol: 'ADMIN',
      activo: true,
      fechaRegistro: '2026-03-19'
    }
  ];

  /**
   * Usuario actualmente autenticado.
   * Se inicializa leyendo localStorage para mantener la sesión
   * al recargar la aplicación.
   */
  usuarioActual = signal<Usuario_2 | null>(this.obtenerUsuarioDesdeStorage());

  constructor() {}

  /**
   * Intenta autenticar un usuario del sistema.
   *
   * @param correo correo ingresado
   * @param contrasena contraseña ingresada
   * @returns resultado del intento de autenticación
   */
  login(correo: string, contrasena: string): {
    exito: boolean;
    mensaje: string;
    usuario?: Usuario_2;
  } {
    const usuarioEncontrado = this.usuarios.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase().trim()
    );

    if (!usuarioEncontrado) {
      return {
        exito: false,
        mensaje: 'No existe un usuario registrado con ese correo.'
      };
    }

    if (usuarioEncontrado.contrasena !== contrasena) {
      return {
        exito: false,
        mensaje: 'La contraseña ingresada no es correcta.'
      };
    }

    if (!usuarioEncontrado.activo) {
      return {
        exito: false,
        mensaje: 'El usuario existe, pero actualmente está inactivo.'
      };
    }

    this.usuarioActual.set(usuarioEncontrado);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarioEncontrado));

    return {
      exito: true,
      mensaje: `Bienvenido/a, ${usuarioEncontrado.nombre}.`,
      usuario: usuarioEncontrado
    };
  }

  /**
   * Registra un nuevo usuario en la lista simulada.
   *
   * Validaciones:
   * - no debe existir otro usuario con el mismo correo
   *
   * @param nuevoUsuario datos del nuevo usuario
   */
  registrarUsuario(nuevoUsuario: {
    nombre: string;
    correo: string;
    contrasena: string;
    rol: RolUsuario;
    activo: boolean;
  }): { exito: boolean; mensaje: string; usuario?: Usuario_2 } {

    const existeCorreo = this.usuarios.some(
      (u) => u.correo.toLowerCase() === nuevoUsuario.correo.toLowerCase().trim()
    );

    if (existeCorreo) {
      return {
        exito: false,
        mensaje: 'Ya existe un usuario registrado con ese correo.'
      };
    }

    const nuevoId =
      this.usuarios.length > 0
        ? Math.max(...this.usuarios.map((u) => u.id)) + 1
        : 1;

    const usuarioCreado: Usuario_2 = {
      id: nuevoId,
      nombre: nuevoUsuario.nombre.trim(),
      correo: nuevoUsuario.correo.trim(),
      contrasena: nuevoUsuario.contrasena,
      rol: nuevoUsuario.rol,
      activo: nuevoUsuario.activo,
      fechaRegistro: new Date().toISOString().split('T')[0]
    };

    this.usuarios.push(usuarioCreado);

    return {
      exito: true,
      mensaje: 'Usuario registrado correctamente.',
      usuario: usuarioCreado
    };
  }

  /**
   * Cierra la sesión actual.
   */
  logout(): void {
    this.usuarioActual.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Devuelve true si hay una sesión activa.
   */
  estaAutenticado(): boolean {
    return this.usuarioActual() !== null;
  }

  /**
   * Devuelve el usuario autenticado actualmente.
   */
  obtenerUsuarioActual(): Usuario_2 | null {
    return this.usuarioActual();
  }

  /**
   * Verifica si el usuario autenticado tiene un rol determinado.
   *
   * @param rol rol a verificar
   */
  tieneRol(rol: RolUsuario): boolean {
    return this.usuarioActual()?.rol === rol;
  }

  /**
   * Devuelve todos los usuarios simulados.
   */
  obtenerUsuarios(): Usuario_2[] {
    return [...this.usuarios];
  }

  /**
   * Lee el usuario autenticado desde localStorage.
   */
  private obtenerUsuarioDesdeStorage(): Usuario_2 | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) as Usuario_2 : null;
  }
}