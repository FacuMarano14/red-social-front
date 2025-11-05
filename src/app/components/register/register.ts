// import { Component } from '@angular/core';
// import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms'; // <- Importación de ReactiveFormsModule
// import { AuthService } from '../../services/auth'; // <- Asumiendo 'auth.service' por convención
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // <- Importación de MatSnackBarModule
// import { Router, RouterLink } from '@angular/router'; // <- Importación de RouterLink
// import { CommonModule } from '@angular/common'; // <- Importación de CommonModule
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule, // Para el formulario
//     CommonModule, // Necesario para directivas comunes como *ngIf
//     MatSnackBarModule, // Para el snackbar
//     MatInputModule,
//     MatFormFieldModule,
//     MatButtonModule,
//     MatCardModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     RouterLink
//   ],
//   templateUrl: './register.html',
//   styleUrls: ['./register.scss'],
// })
// export class RegisterComponent {
//   selectedFile: File | null = null;
//   registerForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private snack: MatSnackBar,
//     private router: Router
//   ) {
//     this.registerForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(8),
//           // Se asume que el patrón es para al menos una mayúscula y un dígito.
//           Validators.pattern(/(?=.*[A-Z])(?=.*\d)/),
//         ],
//       ],
//       repeatPassword: ['', Validators.required],
//       birthDate: ['', Validators.required],
//       description: ['', Validators.required],
//     });
//   }

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
//   }

//   onSubmit() {
//     if (this.registerForm.invalid) {
//       this.snack.open('Completa todos los campos correctamente', 'Cerrar', { duration: 2000 });
//       return;
//     }

//     const { repeatPassword, ...formValue } = this.registerForm.value;
//     if (this.registerForm.value.password !== this.registerForm.value.repeatPassword) {
//       this.snack.open('Las contraseñas no coinciden', 'Cerrar', { duration: 2000 });
//       return;
//     }
    
    
//     this.authService.register(formValue, this.selectedFile!).subscribe({
//       next: (res) => {
//         this.snack.open('Usuario registrado correctamente', 'Cerrar', { duration: 2000 });
//         this.router.navigate(['/login']);
//       },
//       error: (err) => {
//         this.snack.open(err.error?.message || 'Error al registrar', 'Cerrar', { duration: 2000 });
//       },
//     });
//   }
// }

// src/app/register/register.ts (Versión Corregida)

import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth'; // Asegúrate del nombre exacto
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


function passwordsMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;

  if (password && passwordConfirm && password !== passwordConfirm) {
    return { passwordsMismatch: true }; 
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  selectedFile: File | null = null;
  registerForm: FormGroup;

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
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*[A-Z])(?=.*\d)/),
        ],
      ],
      passwordConfirm: ['', Validators.required], 
      // 🟢 CORRECCIÓN 1: Cambiado a 'birthDate' para que coincida con el error
      birthDate: ['', Validators.required], 
      description: ['', Validators.required],
      // 🟢 CORRECCIÓN 2: Se añade el campo 'role' (asumo 'user' por defecto)
      role: ['user'], 
    }, { validators: passwordsMatchValidator });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      if (this.registerForm.errors?.['passwordsMismatch']) {
        this.snack.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
      } else {
        this.snack.open('Completa todos los campos correctamente.', 'Cerrar', { duration: 3000 });
      }
      return;
    }

    const formData = new FormData();
    const formValue = this.registerForm.value;
    
    // Agregamos todos los campos de texto
    formData.append('firstName', formValue.firstName);
    formData.append('lastName', formValue.lastName);
    formData.append('username', formValue.username);
    formData.append('email', formValue.email);
    formData.append('password', formValue.password);
    formData.append('passwordConfirm', formValue.passwordConfirm);
    formData.append('description', formValue.description);
    
    // 🟢 CORRECCIÓN 2b: Añadir el rol
    formData.append('role', formValue.role);

    // 🟢 CORRECCIÓN 3: Formatear la fecha a ISO 8601
    // MatDatepicker devuelve un objeto Date, que debe convertirse a string ISO 8601 (Ej: "1990-05-05T00:00:00.000Z")
    if (formValue.birthDate instanceof Date) {
      // Usamos toISOString() para obtener el formato YYYY-MM-DDTHH:mm:ss.sssZ
      // El backend (MongoDB/Express) generalmente espera este formato.
      formData.append('birthDate', formValue.birthDate.toISOString()); 
    } else {
      // Si el valor no es un objeto Date (ej: si se escribe a mano), se envía tal cual.
      // (aunque idealmente el datepicker fuerza el Date object)
      formData.append('birthDate', formValue.birthDate);
    }
    
    // Si no se selecciona archivo, formData lo enviará vacío, lo que tu backend debe manejar.
    if (this.selectedFile) {
      // 'profileImage' debe coincidir con el nombre de campo que espera tu backend (ej. Multer)
      formData.append('profileImage', this.selectedFile, this.selectedFile.name); 
    }
    
    this.authService.register(formData).subscribe({
      next: (res) => {
        this.snack.open('Usuario registrado correctamente', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || err.error?.error || 'Error desconocido al registrar';
        this.snack.open(errorMessage, 'Cerrar', { duration: 4000 });
      },
    });
  }
}