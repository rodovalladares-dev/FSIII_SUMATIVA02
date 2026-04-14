// Semana 3 - app.ts
// Componente raíz de la aplicación Angular.
// Aquí dejamos la navegación principal y el router-outlet de la SPA.

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Semana 3:
  // Este componente actúa como contenedor principal de la aplicación.
}