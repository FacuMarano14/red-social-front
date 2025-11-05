import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth'; // <- Asumiendo 'auth.service' por convención
import { CommonModule } from '@angular/common'; // <- Importación de CommonModule
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule], // Necesario si usas *ngIf, *ngFor, etc.
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
