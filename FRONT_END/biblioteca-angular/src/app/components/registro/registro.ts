// ==========================================================
// Semana 5 - registro.ts
// Componente para registrar usuarios en el FrontEnd
// ==========================================================
//
// ¿Qué hace este componente?
// - Muestra un formulario de registro.
// - Valida datos del usuario.
// - Aplica reglas de seguridad de contraseña.
// - Registra el usuario usando AuthService.
// - Redirige al login cuando el registro es exitoso.
// ==========================================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RolUsuario } from '../../models/usuario_2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class RegistroComponent {

  nombre = '';
  correo = '';
  contrasena = '';
  confirmarContrasena = '';
  rol: RolUsuario = 'BIBLIOTECARIO';
  activo = true;

  mensajeError = '';
  mensajeExito = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Procesa el formulario de registro.
   */
  registrar(form: NgForm): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (form.invalid) {
      this.mensajeError = 'Debes completar correctamente todos los campos obligatorios.';
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.mensajeError = 'La confirmación de contraseña no coincide.';
      return;
    }

    const validacionContrasena = this.validarContrasena(this.contrasena);
    if (!validacionContrasena.valida) {
      this.mensajeError = validacionContrasena.mensaje;
      return;
    }

    const resultado = this.authService.registrarUsuario({
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena,
      rol: this.rol,
      activo: this.activo
    });

    if (!resultado.exito) {
      this.mensajeError = resultado.mensaje;
      return;
    }

    this.mensajeExito = resultado.mensaje;

    form.resetForm({
      rol: 'BIBLIOTECARIO',
      activo: true
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  }

  /**
   * Valida seguridad básica de contraseña.
   * Reglas:
   * - mínimo 8 caracteres
   * - máximo 20 caracteres
   * - al menos una letra
   * - al menos un número
   * - al menos un carácter especial
   */
  validarContrasena(password: string): { valida: boolean; mensaje: string } {
    if (password.length < 8) {
      return { valida: false, mensaje: 'La contraseña debe tener al menos 8 caracteres.' };
    }

    if (password.length > 20) {
      return { valida: false, mensaje: 'La contraseña no debe superar los 20 caracteres.' };
    }

    if (!/[A-Za-z]/.test(password)) {
      return { valida: false, mensaje: 'La contraseña debe incluir al menos una letra.' };
    }

    if (!/[0-9]/.test(password)) {
      return { valida: false, mensaje: 'La contraseña debe incluir al menos un número.' };
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\/\[\];'+=]/.test(password)) {
      return { valida: false, mensaje: 'La contraseña debe incluir al menos un carácter especial.' };
    }

    return { valida: true, mensaje: 'Contraseña válida.' };
  }
}
