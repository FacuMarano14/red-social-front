import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth'; 
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
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
      next: (res) => {
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
