/**
 * Semana 5 - Desarrollo Full Stack III
 * Componente de Login.
 *
 * ¿Qué hace este componente?
 * - Muestra un formulario de acceso.
 * - Valida correo y contraseña.
 * - Usa el AuthService para autenticar usuarios simulados.
 * - Muestra mensajes de error o éxito.
 * - Redirige a la lista de libros cuando el login es exitoso.
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  /**
   * Modelo del formulario
   */
  correo = '';
  contrasena = '';

  /**
   * Mensajes para la interfaz
   */
  mensajeError = '';
  mensajeExito = '';

  /**
   * Estado de carga del botón
   */
  cargando = false;

  authService = inject(AuthService);
  router = inject(Router);

  /**
   * Procesa el formulario de login.
   *
   * @param form formulario template-driven
   */
  iniciarSesion(form: NgForm): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (form.invalid) {
      this.mensajeError = 'Debes completar correctamente los campos del formulario.';
      return;
    }

    this.cargando = true;

    // Pequeña simulación para mejorar la experiencia visual
    setTimeout(() => {
      const resultado = this.authService.login(this.correo, this.contrasena);

      if (!resultado.exito) {
        this.mensajeError = resultado.mensaje;
        this.cargando = false;
        return;
      }

      this.mensajeExito = resultado.mensaje;
      this.cargando = false;

      // Al iniciar sesión correctamente, se redirige a la vista principal actual
      this.router.navigate(['/usuarios']);
    }, 500);
  }

  /**
   * Carga credenciales de ADMIN para pruebas rápidas.
   */
  cargarAdminDemo(): void {
    this.correo = 'pedro.munoz@biblioteca.cl';
    this.contrasena = 'Lectura2026';
  }

  /**
   * Carga credenciales de BIBLIOTECARIO para pruebas rápidas.
   */
  cargarBibliotecarioDemo(): void {
    this.correo = 'luis.herrera@biblioteca.cl';
    this.contrasena = 'Biblio123';
  }
}
