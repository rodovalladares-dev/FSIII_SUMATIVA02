// ==========================================================
// Semana 3 - app.config.ts
// Configuración global de la aplicación Angular
// ==========================================================
//
// Este archivo define servicios globales que Angular necesita
// al iniciar la aplicación.
//
// En esta parte del proyecto estamos viendo cómo preparar
// la base de la SPA para que pueda:
//
// 1) navegar entre pantallas con rutas
// 2) consumir el backend mediante HTTP
//
// En otras palabras, aquí "habilitamos" herramientas clave
// que luego usarán los componentes del proyecto.
//

import { ApplicationConfig } from '@angular/core';
// ApplicationConfig permite definir la configuración general
// de arranque de la aplicación Angular standalone.

import { provideRouter } from '@angular/router';
// provideRouter registra el sistema de rutas de Angular.
// Gracias a esto podemos movernos entre pantallas como:
// /libros, /agregar, /editar/:id, /detalle/:id

import { provideHttpClient } from '@angular/common/http';
// provideHttpClient habilita HttpClient en toda la aplicación.
// Esto permite que los servicios hagan solicitudes al backend,
// por ejemplo para listar, crear, editar o eliminar libros.

import { routes } from './app.routes';
// Importamos la definición de rutas creada en app.routes.ts.
// Allí está el mapa de navegación principal del proyecto.

export const appConfig: ApplicationConfig = {
  // providers contiene los servicios globales que Angular
  // deja disponibles para toda la aplicación.

  providers: [
    provideRouter(routes),
    // Activa el enrutamiento usando las rutas definidas
    // en el archivo app.routes.ts

    provideHttpClient()
    // Activa el cliente HTTP global para consumir APIs REST
    // desde servicios como libros.service.ts
  ]
}