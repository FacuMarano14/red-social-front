import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <- Necesario para el <router-outlet/>
import { NavbarComponent } from './components/navbar/navbar'; // <- Asegurando la ruta y el nombre correcto

@Component({
  selector: 'app-root',
  standalone: true,
  // Asegúrate de que NavbarComponent esté importado
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  // Cambiado a signal para seguir la práctica moderna de Angular
  title = signal('Red Social');
}