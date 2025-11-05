import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  selectedFile: File | null = null;
  registerForm : FormGroup;

  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*[A-Z])(?=.*\d)/)],
    ],
    repeatPassword: ['', Validators.required],
    birthDate: ['', Validators.required],
    description: ['', Validators.required],
  });

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.snack.open('Completa todos los campos correctamente', 'Cerrar', { duration: 2000 });
      return;
    }

    const { repeatPassword, ...formValue } = this.registerForm.value;
    if (this.registerForm.value.password !== this.registerForm.value.repeatPassword) {
      this.snack.open('Las contraseñas no coinciden', 'Cerrar', { duration: 2000 });
      return;
    }

    this.authService.register(formValue, this.selectedFile!).subscribe({
      next: (res) => {
        this.snack.open('Usuario registrado correctamente', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snack.open(err.error.message || 'Error al registrar', 'Cerrar', { duration: 2000 });
      },
    });
  }
}
