import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth'; 
import { Router, RouterLink } from '@angular/router'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 
import { CommonModule } from '@angular/common'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    RouterLink 
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.snack.open('Completa todos los campos', 'Cerrar', { duration: 2000 });
      return;
    }

   
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.authService.saveSession(res.access_token, res.user);
        this.snack.open('Bienvenido ' + res.user.username, 'Cerrar', { duration: 2000 });
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.snack.open('Credenciales incorrectas', 'Cerrar', { duration: 2000 });
      },
    });
  }
}