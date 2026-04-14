package com.biblioteca.biblioteca.model;

// ===============================
// IMPORTACIONES JPA
// ===============================
// Estas anotaciones permiten mapear la clase Libro a una tabla en la base de datos Oracle.
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
// ===============================
// IMPORTACIONES DE VALIDACIÓN
// ===============================
// Estas anotaciones permiten validar los datos que llegan desde el cliente
// antes de guardarlos en la base de datos.
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * La anotación @Entity indica que esta clase representa una entidad de base de
 * datos.
 * Es decir, cada objeto Libro se almacenará como un registro dentro de la tabla
 * LIBROS.
 */
@Entity

/**
 * La anotación @Table permite indicar el nombre exacto de la tabla en Oracle.
 */
@Table(name = "GESUSER")
public class Users {

    /**
     * @Id indica que este atributo será la clave primaria de la tabla.
     */
    @Id

    /**
     * @GeneratedValue indica que el valor del id será generado automáticamente.
     *                 En este caso, se usa la estrategia IDENTITY.
     */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * ===============================
     * CAMPO: NOMBRE
     * ===============================
     * Semana 1:
     * - Se trabajó con un atributo simple para almacenar el nombre del usuario.
     *
     * Semana 2:
     * - Se refuerza con validaciones más completas para asegurar calidad de datos.
     */
    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 5, max = 200, message = "El nombre debe tener entre 5 y 200 caracteres")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$", message = "El nombre solo puede contener letras y espacios")
    @Column(name = "NOMBRE", nullable = false, length = 200)
    private String nombre;

    /**
     * ===============================
     * CAMPO: EMAIL
     * ===============================
     * Se valida que el email no esté vacío y que tenga un formato válido.
     */
    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "Debe proporcionar un formato de correo válido")

    @Size(max = 100, message = "El email no puede exceder los 100 caracteres")
    @Column(name = "EMAIL", nullable = false, length = 100, unique = true)
    private String email;
    /**
     * ===============================
     * CAMPO: Rol
     * ===============================
     * Semana 1:
     * - Solo se controlaba que el año no fuera negativo.
     *
     * Semana 2:
     * - Se mejora la validación indicando que el campo es obligatorio
     * y que además debe estar dentro de un rango razonable.
     * 
     */

    @NotNull(message = "El rol es obligatorio")
    @Min(value = 1, message = "El rol debe ser al menos 1")
    @Max(value = 999, message = "El rol no puede ser mayor a 999")
    @Column(name = "ROL", nullable = false)
    private Integer rol;

    /**
     * ===============================
     * CAMPO: FECHA_REG
     * ===============================
     * Semana 1:
     * - Se trabajó con un atributo simple para almacenar la fecha de registro del
     * usuario.
     *
     * Semana 2:
     * - Se refuerza con validaciones más completas para asegurar calidad de datos.
     */
    // Mapea este atributo Java a la columna ANIO_PUBLICACION de Oracle
    @Column(name = "FECHA_REG")

    private String fecha_reg;

    /**
     * Constructor vacío obligatorio para JPA.
     * JPA necesita este constructor para poder instanciar objetos al leer desde la
     * base de datos.
     */
    public Users() {
    }

    /**
     * Constructor con parámetros.
     * Sirve para crear objetos Libro de manera más cómoda cuando se requiera.
     */
    public Users(Long id, String nombre, String email, Integer rol, String fecha_reg) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.fecha_reg = fecha_reg;
    }

    /**
     * Devuelve el id del libro.
     */
    public Long getId() {
        return id;
    }

    /**
     * Permite asignar el id del libro.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Devuelve el título del libro.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Permite asignar el título del libro.
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Devuelve el autor del libro.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Permite asignar el autor del libro.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Devuelve el año de publicación del libro.
     */
    public Integer getRol() {
        return rol;
    }

    /**
     * Permite asignar el año de publicación del libro.
     */
    public void setRol(Integer rol) {
        this.rol = rol;
    }

    /**
     * Devuelve el género del libro.
     */
    public String getFecha() {
        return fecha_reg;
    }

    /**
     * Permite asignar el género del libro.
     */
    public void setFecha(String fecha_reg) {
        this.fecha_reg = fecha_reg;
    }
}