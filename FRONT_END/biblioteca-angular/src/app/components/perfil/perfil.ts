// ==========================================================
// Semana 5 - perfil.ts
// Componente para mostrar el perfil del usuario autenticado
// ==========================================================
//
// ¿Qué hace este componente?
// - Obtiene el usuario actual desde AuthService.
// - Muestra su información principal en pantalla.
// - Sirve como base para la futura edición de perfil.
//
// En esta etapa no editaremos todavía los datos;
// primero construiremos la vista de perfil.
// ==========================================================

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class PerfilComponent {

  authService = inject(AuthService);

  /**
   * Usuario autenticado actual.
   * Se obtiene desde el servicio de autenticación.
   */
  usuarioActual = computed(() => this.authService.usuarioActual());
}