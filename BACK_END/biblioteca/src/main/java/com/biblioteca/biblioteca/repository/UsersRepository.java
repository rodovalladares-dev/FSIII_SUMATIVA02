package com.biblioteca.biblioteca.repository;

// ===============================
// IMPORTACIÓN DE LA ENTIDAD
// ===============================
// Se importa la clase Libro, que será gestionada por este repository.
import com.biblioteca.biblioteca.model.Users;

// ===============================
// IMPORTACIÓN DE SPRING DATA JPA
// ===============================
// JpaRepository proporciona métodos CRUD ya implementados automáticamente.
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * ===============================
 * REPOSITORY: LibroRepository
 * ===============================
 *
 * Esta interfaz permite interactuar con la base de datos para la entidad Libro.
 *
 * Spring Data JPA generará automáticamente la implementación en tiempo de
 * ejecución.
 *
 * JpaRepository<Libro, Long> significa:
 * - Libro → la entidad que se manejará
 * - Long → el tipo de dato de la clave primaria (id)
 *
 * Métodos disponibles automáticamente:
 * - save() → guardar o actualizar
 * - findAll() → listar todos
 * - findById() → buscar por id
 * - deleteById() → eliminar por id
 *
 * 💡 Semana 2:
 * En esta etapa entendemos que no es necesario escribir SQL para operaciones
 * básicas,
 * ya que Spring Boot se encarga de generarlas automáticamente.
 */
public interface UsersRepository extends JpaRepository<Users, Long> {

    // ===============================
    // EJEMPLO OPCIONAL (NO OBLIGATORIO)
    // ===============================
    // Spring puede generar consultas automáticamente basándose en el nombre del
    // método.
    //
    // Ejemplo:
    // List<Libro> findByAutor(String autor);
}