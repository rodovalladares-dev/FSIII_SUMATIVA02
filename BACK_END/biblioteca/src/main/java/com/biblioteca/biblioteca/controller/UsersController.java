package com.biblioteca.biblioteca.controller;

// ===============================
// IMPORTACIONES DEL PROYECTO
// ===============================
import com.biblioteca.biblioteca.model.Users;
import com.biblioteca.biblioteca.service.UsersService;

// ===============================
// IMPORTACIONES SPRING
// ===============================
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// ===============================
// VALIDACIONES
// ===============================
import jakarta.validation.Valid;

import java.util.List;

/**
 * ===============================
 * CONTROLLER: LibroController
 * ===============================
 *
 * Maneja las solicitudes HTTP del cliente.
 *
 * Semana 1:
 * - Devolvía objetos directos y Optional
 *
 * Semana 2:
 * - Se utilizan ResponseEntity
 * - Se aplican códigos HTTP correctos
 * - Se integran validaciones (@Valid)
 */
@RestController

/*
 * Semana 3 haboliatmos el cross para permitir peticiones desde otros dominios
 * como angular que se ejecuta en http://localhost:4200
 */

@CrossOrigin(origins = "http://localhost:4200")

// Ruta base más profesional
@RequestMapping("/api/usuarios")
public class UsersController {

    private final UsersService usuarioService;

    public UsersController(UsersService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // ==========================================================
    // LISTAR TODOS LOS USUARIOS
    // ==========================================================

    @GetMapping
    public ResponseEntity<List<Users>> obtenerUsuarios() {

        List<Users> usuarios = usuarioService.obtenerTodos();

        return ResponseEntity.ok(usuarios); // 200 OK
    }

    // ==========================================================
    // BUSCAR POR ID
    // ==========================================================

    @GetMapping("/{id}")
    public ResponseEntity<Users> obtenerUsuario(@PathVariable Long id) {

        Users usuario = usuarioService.obtenerPorId(id);

        return ResponseEntity.ok(usuario); // 200 OK
    }

    // ==========================================================
    // CREAR USUARIO
    // ==========================================================

    @PostMapping
    public ResponseEntity<Users> crearUsuario(@Valid @RequestBody Users usuario) {

        Users nuevoUsuario = usuarioService.guardar(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario); // 201
    }

    // ==========================================================
    // ACTUALIZAR USUARIO
    // ==========================================================

    @PutMapping("/{id}")
    public ResponseEntity<Users> actualizarUsuario(
            @PathVariable Long id,
            @Valid @RequestBody Users usuario) {

        Users usuarioActualizado = usuarioService.actualizar(id, usuario);

        return ResponseEntity.ok(usuarioActualizado); // 200
    }

    // ==========================================================
    // ELIMINAR USUARIO
    // ==========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {

        usuarioService.eliminar(id);

        return ResponseEntity.noContent().build(); // 204
    }
}