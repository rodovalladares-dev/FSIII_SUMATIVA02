// Semana 3 - libro-form.ts
// Este componente muestra el formulario para crear o editar libros.
// Aquí incorporamos validaciones visuales en Angular y manejo
// de errores para que el usuario vea mensajes claros en pantalla.

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss'
})
export class UsuarioForm implements OnInit {

  // Semana 3:
  // Objeto base del formulario.
  usuario: Usuario = {
    nombre: '',
    email: '',
    rol: 0,
    fecha: ''
  };

  // Semana 3:
  // Variable para distinguir entre alta y edición.
  modoEdicion = false;

  // Semana 3:
  // Guarda el id del usuario cuando estamos editando.
  idUsuario: number | null = null;

  // Semana 3:
  // Mensaje general de error visual para mostrar en pantalla.
  mensajeError = '';

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.modoEdicion = true;
      this.idUsuario = Number(idParam);
      this.cargarUsuario(this.idUsuario);
    }
  }

  // Semana 3:
  // Carga un usuario desde el backend para edición.
  cargarUsuario(id: number): void {
    this.usuariosService.getUsuarioById(id).subscribe({
      next: (data) => {
        console.log('Usuario cargado para edición:', data);
        this.usuario = data;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al cargar el usuario para editar:', error);
        this.mensajeError = 'No se pudo cargar el usuario para edición.';
        this.cdr.markForCheck();
      }
    });
  }
  formatearFecha(fecha: string): string {
    const partes = fecha.split('-'); // ["2026","04","08"]
    return `${partes[2]}-${partes[1]}-${partes[0]}`; // "08-04-2026"
  }


  // Semana 3:
  // Este método recibe también la referencia del formulario para validar
  // si Angular considera correctos todos los campos antes de enviar.
  guardarUsuario(formulario: NgForm): void {
    this.mensajeError = '';
    this.usuario.fecha = this.formatearFecha(this.usuario.fecha);


    // Semana 3:
    // Si el formulario es inválido, marcamos todo como tocado
    // para que aparezcan los mensajes visuales.
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      return;
    }

    console.log('Usuario a guardar:', this.usuario);

    if (this.modoEdicion && this.idUsuario !== null) {
      this.actualizarUsuario();
    } else {
      this.crearUsuario();
    }
  }

  // Semana 3:
  // Crear un usuario nuevo con POST.
  crearUsuario(): void {
   
    this.usuariosService.createUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        console.log('Usuario guardado correctamente:', respuesta);
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al guardar el usuario:', error);
        this.mensajeError = this.obtenerMensajeError(error);
        this.cdr.markForCheck();
      }
    });
  }

  // Semana 3:
  // Actualizar un usuario existente con PUT.
  actualizarUsuario(): void {
    if (this.idUsuario === null) return;
    

    this.usuariosService.updateUsuario(this.idUsuario, this.usuario).subscribe({
      next: (respuesta) => {
        console.log('Usuario actualizado correctamente:', respuesta);
        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
        this.mensajeError = this.obtenerMensajeError(error);
        this.cdr.markForCheck();
      }
    });
  }

  // Semana 3:
  // Intenta construir un mensaje amigable para mostrar en pantalla.
  // Si el backend no devuelve un formato claro de errores,
  // mostramos un mensaje general.
  obtenerMensajeError(error: any): string {
    if (error?.status === 400) {
      return 'Los datos enviados no cumplen las validaciones requeridas. Revisa los campos del formulario.';
    }

    return 'Ocurrió un error al procesar la solicitud. Intenta nuevamente.';
  }
}