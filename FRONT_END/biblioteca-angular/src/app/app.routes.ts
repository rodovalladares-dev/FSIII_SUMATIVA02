// ==========================================================
// Semana 3 - app.routes.ts
// Definición de rutas de la aplicación
// ==========================================================
//
// Este archivo organiza la navegación del proyecto.
//
// En Angular, las rutas permiten que una aplicación SPA
// cambie de vista sin recargar toda la página.
//
// En este proyecto de biblioteca, las rutas conectan
// cada pantalla con una acción del sistema:
//
// - ver lista de libros
// - agregar un libro
// - editar un libro existente
// - ver detalle de un libro
//
// Esto es clave en Semana 3, porque estamos trabajando
// la estructura del frontend, la navegación y la conexión
// entre componentes.
//

import { Routes } from '@angular/router';
// Routes es el tipo que Angular usa para definir
// el arreglo de rutas de la aplicación.
import { LoginComponent } from './components/login/login';
import { PerfilComponent } from './components/perfil/perfil';
import { RegistroComponent } from './components/registro/registro';
import { UsuariosLista } from './components/usuarios-lista/usuarios-lista';
import { UsuarioForm } from './components/usuario-form/usuario-form';
import { UsuarioDetalle } from './components/usuario-detalle/usuario-detalle';
import { NavbarComponent } from './components/navbar/navbar';
//import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena';
// Importamos los componentes que se van a mostrar
// según la ruta que visite el usuario.

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // Ruta inicial de la aplicación.
  // Cuando el usuario entra a la raíz del sitio,
  // por ejemplo http://localhost:4200/
  // Angular redirige automáticamente a /libros
  //
  // pathMatch: 'full' indica que la redirección se aplica
  // solo cuando la URL está completamente vacía.
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'navbar', 
    component: NavbarComponent },
  // Muestra la pantalla de inicio de sesión.
  //{
   // path: 'recuperar-contrasena',
   // component: RecuperarContrasenaComponent
  //},
  {
    path: 'perfil',
    component: PerfilComponent
  },
  // Muestra la pantalla de perfil del usuario autenticado.
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'usuarios',
    component: UsuariosLista
  },
  // Muestra la vista principal con el listado de usuarios.
  // Esta será una de las pantallas más importantes del sistema,
  // porque permite visualizar los registros existentes.
  
  {
    path: 'agregar',
    component: UsuarioForm
  },
  // Muestra el formulario para crear un nuevo usuario.
  // Aquí el usuario podrá ingresar los datos
  // y enviarlos al backend.

  {
    path: 'editar/:id',
    component: UsuarioForm
  },
  // Muestra el mismo formulario, pero en modo edición.
  //
  // :id es un parámetro dinámico de la ruta.
  // Esto permite capturar el identificador del libro
  // que se desea modificar.
  //
  // Ejemplo:
  // /editar/5
  //
  // Luego, dentro del componente, ese id se puede leer
  // para cargar el libro correspondiente.

  {
    path: 'detalle/:id',
    component: UsuarioDetalle
  },
  {
    path: '**',
    redirectTo: 'login'
  }
  // Ruta comodín para manejar URLs no definidas.
  // Si el usuario intenta acceder a una ruta que no existe,
  // Angular lo redirige automáticamente a /login.
  
  // Muestra la vista de detalle de un usuario específico.
  //
  // Igual que en editar, aquí usamos un parámetro dinámico
  // llamado :id para saber qué usuario se debe consultar.
  //
  // Ejemplo:
  // /detalle/3
];