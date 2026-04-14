// ==========================================================
// Semana 3 - libro-detalle.ts
// Componente para mostrar el detalle de un libro
// ==========================================================
//
// Este componente se encarga de obtener un libro específico
// desde el backend a partir del id recibido en la URL.
//
// En esta parte del proyecto estamos trabajando:
// - lectura de parámetros de ruta
// - consumo de API REST
// - carga de datos para una vista de detalle
//

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// OnInit permite ejecutar lógica al iniciar el componente
// ChangeDetectorRef se mantiene para asegurar actualización visual

import { CommonModule } from '@angular/common';
// Permite usar directivas comunes de Angular en la vista

import { ActivatedRoute, RouterLink } from '@angular/router';
// ActivatedRoute permite leer parámetros desde la URL
// RouterLink permite navegar desde el HTML

import { Usuario } from '../../models/usuario';
// Modelo que representa la estructura de un libro

import { UsuariosService } from '../../services/usuarios.service';
// Servicio que se comunica con el backend

@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-detalle.html',
  styleUrl: './usuario-detalle.scss'
})
export class UsuarioDetalle implements OnInit {

  // Variable que almacenará el usuario obtenido desde el backend
  usuario: Usuario | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================================
  // Se ejecuta al iniciar el componente
  // ==========================================================
  ngOnInit(): void {

    // Obtenemos el parámetro "id" desde la URL
    const idParam = this.route.snapshot.paramMap.get('id');

    // Si existe un id válido, lo convertimos a número
    // y cargamos el detalle del libro
    if (idParam) {
      const id = Number(idParam);
      this.cargarUsuario(id);
    }
  }

  // ==========================================================
  // Obtener detalle de un usuario por id
  // ==========================================================
  cargarUsuario(id: number): void {
    this.usuariosService.getUsuarioById(id).subscribe({
      next: (data) => {
        console.log('Detalle del usuario recibido:', data);

        // Guardamos el usuario recibido para mostrarlo en la vista
        this.usuario  = data;

        // Forzamos actualización visual del componente
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al obtener el detalle del usuario:', error);
      }
    });
  }
}