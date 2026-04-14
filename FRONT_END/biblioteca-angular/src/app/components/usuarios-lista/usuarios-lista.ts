// ==========================================================
// Semana 3 - libros-lista.ts
// Componente para listar libros y gestionar eliminación
// ==========================================================
//
// Este componente se encarga de:
// - mostrar todos los libros desde el backend
// - permitir eliminar registros
// - navegar a otras vistas (detalle, editar, agregar)
//
// En Semana 3 estamos trabajando:
// - consumo de servicios (API REST)
// - ciclo de vida del componente
// - interacción usuario (acciones CRUD)
//

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// OnInit permite ejecutar lógica al cargar el componente
// ChangeDetectorRef permite forzar actualización de la vista

import { CommonModule } from '@angular/common';
// Necesario para usar directivas como *ngIf y *ngFor

import { RouterLink } from '@angular/router';
// Permite navegar entre rutas desde el HTML

import { UsuariosService } from '../../services/usuarios.service';
// Servicio que conecta con el backend

import { Usuario } from '../../models/usuario';
// Modelo de datos de usuario

@Component({
  selector: 'app-usuarios-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuarios-lista.html',
  styleUrl: './usuarios-lista.scss'
})
export class UsuariosLista implements OnInit {

  // Lista de usuarios que se mostrará en la vista
  usuarios: Usuario[] = [];

  // Perfil del usuario actual
  perfilUsuario: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef
  ) {}

  // ==========================================================
  // Ciclo de vida → se ejecuta al iniciar el componente
  // ==========================================================
  ngOnInit(): void {
    console.log('COMPONENTE USUARIOS CARGADO');

    // Carga inicial de datos
    this.cargarUsuarios();
  }

  // ==========================================================
  // Obtener todos los usuarios desde el backend
  // ==========================================================
  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        console.log('Usuarios recibidos:', data);

        // Asignamos los datos a la variable que usa la vista
        this.usuarios = data;

        // Forzamos actualización visual (útil en algunos casos)
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });
  }

  // ==========================================================
  // Eliminar usuario con confirmación
  // ==========================================================
  eliminarUsuario(id: number | undefined): void {

    // Validación básica
    if (!id) return;

    // Confirmación del usuario
    const confirmado = confirm('¿Estás seguro de que deseas eliminar este usuario?');

    if (!confirmado) return;

    // Llamada al backend para eliminar
    this.usuariosService.deleteUsuario(id).subscribe({
      next: () => {
        console.log(`Usuario con id ${id} eliminado correctamente.`);

        // Recargar lista después de eliminar
        this.cargarUsuarios();
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }

}