import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  protected readonly title = signal('frontend');
}
