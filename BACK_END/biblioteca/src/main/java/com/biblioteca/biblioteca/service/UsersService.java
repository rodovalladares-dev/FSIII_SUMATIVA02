
package com.biblioteca.biblioteca.service;

// ===============================
// IMPORTACIONES DEL PROYECTO
// ===============================
// Se importa la entidad Libro, que representa cada registro de la tabla LIBROS.
import com.biblioteca.biblioteca.model.Users;

// Se importa la excepción personalizada que utilizaremos cuando un libro no exista.
import com.biblioteca.biblioteca.exception.ResourceNotFoundException;

// Se importa el repository, que se encarga de la comunicación con la base de datos.
import com.biblioteca.biblioteca.repository.UsersRepository;

// ===============================
// IMPORTACIONES DE SPRING
// ===============================
// Marca esta clase como un servicio dentro del contexto de Spring.
import org.springframework.stereotype.Service;

// ===============================
// IMPORTACIONES DE LOMBOK
// ===============================
// @Slf4j permite registrar logs de manera profesional.
import lombok.extern.slf4j.Slf4j;

// ===============================
// IMPORTACIONES DE JAVA
// ===============================
import java.util.List;

/**
 * ===============================
 * SERVICIO: LibroService
 * ===============================
 *
 * Esta clase contiene la lógica de negocio del microservicio de libros.
 *
 * Semana 1:
 * - Se trabajó con operaciones CRUD básicas.
 *
 * Semana 2:
 * - Se incorpora logging profesional.
 * - Se mejora el manejo de errores mediante excepciones personalizadas.
 * - Se mantiene una separación clara entre controller, service y repository.
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service

public class UsersService {
    private static final Logger log = LoggerFactory.getLogger(UsersService.class);

    /**
     * Referencia al repository.
     * Esta variable permitirá acceder a los métodos CRUD provistos por JPA.
     */
    private final UsersRepository usersRepository;

    /**
     * Constructor con inyección de dependencias.
     * Spring Boot entrega automáticamente una instancia de LibroRepository.
     */
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    // ==========================================================
    // OBTENER TODOS LOS LIBROS
    // ==========================================================

    /**
     * Este método recupera todos los libros registrados en la base de datos.
     *
     * @return lista de libros
     */

    public List<Users> obtenerTodos() {
        log.info("Solicitando listado completo de usuarios.");

        List<Users> usuarios = usersRepository.findAll();

        log.info("Se encontraron {} usuarios registrados.", usuarios.size());
        return usuarios;
    }

    // ==========================================================
    // OBTENER UN LIBRO POR SU ID
    // ==========================================================

    /**
     * Este método busca un libro por su id.
     * Si no existe, se lanza una excepción personalizada.
     *
     * @param id identificador del libro
     * @return libro encontrado
     */
    public Users obtenerPorId(Long id) {
        log.info("Buscando usuario con ID: {}", id);

        return usersRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("No se encontró un usuario con ID: {}", id);
                    return new ResourceNotFoundException("Usuario no encontrado con ID: " + id);
                });
    }

    // ==========================================================
    // GUARDAR UN NUEVO LIBRO
    // ==========================================================

    /**
     * Este método guarda un nuevo libro en la base de datos.
     *
     * @param libro libro a registrar
     * @return libro guardado
     */
    public Users guardar(Users user) {
        log.info("Guardando nuevo usuario con nombre: {}", user.getNombre());

        Users userGuardado = usersRepository.save(user);

        log.info("Usuario guardado correctamente con ID: {}", userGuardado.getId());
        return userGuardado;
    }

    // ==========================================================
    // ACTUALIZAR UN LIBRO EXISTENTE
    // ==========================================================

    /**
     * Este método actualiza un libro existente a partir de su id.
     * Si el libro no existe, se lanza una excepción personalizada.
     *
     * @param id               identificador del libro a actualizar
     * @param libroActualizado datos nuevos del libro
     * @return libro actualizado
     */
    public Users actualizar(Long id, Users userActualizado) {
        log.info("Intentando actualizar usuario con ID: {}", id);

        Users userExistente = usersRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("No se puede actualizar. Usuario no encontrado con ID: {}", id);
                    return new ResourceNotFoundException("Usuario no encontrado con ID: " + id);
                });

        // Se actualizan los campos con los nuevos valores recibidos.
        userExistente.setNombre(userActualizado.getNombre());
        userExistente.setEmail(userActualizado.getEmail());
        userExistente.setRol(userActualizado.getRol());
        userExistente.setFecha(userActualizado.getFecha());

        Users userGuardado = usersRepository.save(userExistente);

        log.info("Usuario actualizado correctamente con ID: {}", userGuardado.getId());
        return userGuardado;
    }

    // ==========================================================
    // ELIMINAR UN LIBRO POR SU ID
    // ==========================================================

    /**
     * Este método elimina un libro utilizando su id.
     * Si el libro no existe, se lanza una excepción personalizada.
     *
     * @param id identificador del libro a eliminar
     */
    public void eliminar(Long id) {
        log.info("Intentando eliminar usuario con ID: {}", id);

        Users userExistente = usersRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("No se puede eliminar. Usuario no encontrado con ID: {}", id);
                    return new ResourceNotFoundException("Usuario no encontrado con ID: " + id);
                });

        usersRepository.delete(userExistente);

        log.info("Usuario eliminado correctamente con ID: {}", id);
    }
}