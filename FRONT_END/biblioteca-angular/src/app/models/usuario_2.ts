// ==========================================================
// Semana 3 -  Modelos de datos en Angular
// Modelo de datos para representar un usuario en la aplicación
// ==========================================================
//
// Este archivo define la estructura del objeto
// que se utilizará en toda la aplicación Angular.
//
// Se usa para:
// - recibir datos desde el backend
// - enviar datos al crear un usuario
// - enviar datos al actualizar un usuario
//
// En Semana 3 esto es importante porque estamos aprendiendo
// a trabajar con modelos para organizar mejor la información
// dentro del frontend.

export type RolUsuario = 'ADMIN' | 'BIBLIOTECARIO' | 'USUARIO';

export interface Usuario_2 {
  // ID único del usuario, asignado por el backend.
  // Es opcional porque al crear un nuevo usuario no se tiene un ID aún,
  // normalmente el backend lo genera automáticamente al guardar el nuevo registro.

  id: number;

  // Nombre del usuario
  nombre: string;

  // Correo electrónico del usuario
  correo: string;

  // Contraseña del usuario
  contrasena: string;

  // Rol del usuario
  rol: RolUsuario;

  // Estado activo del usuario
  activo: boolean;

  // Fecha de registro del usuario
  fechaRegistro: string;
}