// Semana 3 - main.ts
// Punto de entrada principal de la aplicación Angular.
// Desde aquí se inicia el componente raíz junto con la configuración global.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));