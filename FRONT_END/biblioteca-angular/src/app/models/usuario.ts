// ==========================================================
// Semana 3 -  Modelos de datos en Angular
// Modelo de datos para representar un libro en la aplicación
// ==========================================================
//
// Este archivo define la estructura del objeto
// // que se utilizará en toda la aplicación Angular.
//
// Se usa para:
// - recibir datos desde el backend
// - enviar datos al crear un libro
// - enviar datos al actualizar un libro
//
// En Semana 3 esto es importante porque estamos aprendiendo
// a trabajar con modelos para organizar mejor la información
// dentro del frontend.

export interface Usuario {
  // ID único del libro, asignado por el backend.
  // Es opcional porque al crear un nuevo libro no se tiene un ID aún,
  // normalmente el backend lo genera automáticamente al guardar el nuevo registro.

  id?: number;

  // Título del libro
  nombre: string;

  // Autor del libro
  email: string;

  // Año de publicación del libro
  rol: number;

  // Género o categoría literaria del libro
  fecha: string;
}