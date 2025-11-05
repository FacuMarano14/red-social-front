// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';


// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';


// import { LoginComponent } from './components/login/login';
// import { RegisterComponent } from './components/register/register';
// import { PostsComponent } from './components/posts/posts';
// import { ProfileComponent } from './components/profile/profile';
// import { NavbarComponent } from './components/navbar/navbar';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     RegisterComponent,
//     PostsComponent,
//     ProfileComponent,
//     NavbarComponent,
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     ReactiveFormsModule,
//     FormsModule,
//     HttpClientModule,
//     // Material modules
//     MatInputModule,
//     MatButtonModule,
//     MatCardModule,
//     MatToolbarModule,
//     MatIconModule,
//     MatDialogModule,
//     MatSnackBarModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login';
// import { RegisterComponent } from './components/register/register';
// import { PostsComponent } from './components/posts/posts';
// import { ProfileComponent } from './components/profile/profile';
// import { NavbarComponent } from './components/navbar/navbar';

// // Angular Material
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     RegisterComponent,
//     PostsComponent,
//     ProfileComponent,
//     NavbarComponent,
//   ],
//   imports: [
//     BrowserModule,
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//     BrowserAnimationsModule,
//     HttpClientModule,
//     MatToolbarModule,
//     MatCardModule,
//     MatInputModule,
//     MatButtonModule,
//     AppRoutingModule,
//   ],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importar CommonModule si se usa *ngFor en otros componentes

// Importaciones de Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Componentes
import { LoginComponent } from './components/login/login'; // Corregir ruta
import { RegisterComponent } from './components/register/register'; // Corregir ruta
import { PostsComponent } from './components/posts/posts'; // Corregir ruta
import { ProfileComponent } from './components/profile/profile'; // Corregir ruta
import { NavbarComponent } from './components/navbar/navbar'; // Corregir ruta

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    ProfileComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule, // Necesario para directivas (*ngIf, *ngFor)
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // Material modules (COMPLETOS)
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule, // Necesario para el datepicker
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}