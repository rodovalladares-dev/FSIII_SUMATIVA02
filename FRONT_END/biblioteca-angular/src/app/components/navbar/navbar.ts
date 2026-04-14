// ==========================================================
// Semana 5 - navbar.ts
// Componente de navegación principal del sistema
// ==========================================================
//
// ¿Qué hace este componente?
// - Muestra el menú principal cuando el usuario ha iniciado sesión.
// - Muestra el nombre y rol del usuario autenticado.
// - Controla qué opciones se ven según el rol.
// - Permite cerrar sesión.
//
// Roles considerados:
// - ADMIN
// - BIBLIOTECARIO
//
// En esta etapa, los roles se manejan desde el FrontEnd
// usando el AuthService, ya que todavía no estamos obligando
// la integración completa con el BackEnd.
// ==========================================================

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
 
  authService = inject(AuthService);
  router = inject(Router);

  /**
   * Usuario autenticado actual.
   * Usamos computed para obtener el valor reactivo del signal
   * definido en el AuthService.
   */
  usuarioActual = computed(() => this.authService.usuarioActual());

  /**
   * Indica si el usuario autenticado es ADMIN.
   */
  esAdmin = computed(() => this.authService.tieneRol('ADMIN'));

  /**
   * Indica si el usuario autenticado es BIBLIOTECARIO.
   */
  esBibliotecario = computed(() => this.authService.tieneRol('BIBLIOTECARIO'));

  /**
   * Cierra la sesión actual y redirige al login.
   */
  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}