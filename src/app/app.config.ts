// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideHttpClient } from '@angular/common/http';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// // Angular Material
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideAnimations(),
//     provideHttpClient(),
//     importProvidersFrom(
//       CommonModule,
//       FormsModule,
//       ReactiveFormsModule,
//       MatToolbarModule,
//       MatCardModule,
//       MatButtonModule,
//       MatInputModule,
//       MatIconModule,
//       MatDatepickerModule,
//       MatNativeDateModule
//     ),
//   ],
// };

// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideHttpClient } from '@angular/common/http';

// // SOLUCIÓN 2: Importaciones de Forms (ahora funciones, no módulos)
// import { provideFormsModule, provideReactiveFormsModule } from '@angular/forms'; 

// // Angular Material Modules (estos deben ser importados para usarlos en importProvidersFrom)
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideAnimations(),
//     provideHttpClient(),
//     // SOLUCIÓN 1: Usar funciones de provide para los Forms.
//     provideFormsModule(), 
//     provideReactiveFormsModule(), 
    
//     // El CommonModule ya no es necesario aquí. Es provisto implícitamente por Angular.
    
//     // Se usa importProvidersFrom para cargar módulos de terceros (Material)
//     // o módulos de Angular que aún no tienen una función 'provide' simple.
//     importProvidersFrom(
//       MatToolbarModule,
//       MatCardModule,
//       MatButtonModule,
//       MatInputModule,
//       MatIconModule,
//       MatDatepickerModule,
//       MatNativeDateModule
//     ),
//   ],
// };

// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideHttpClient } from '@angular/common/http';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes),
//     provideAnimations(),
//     provideHttpClient(),
    

//     importProvidersFrom(
//       FormsModule,          
//       ReactiveFormsModule,  
//       MatToolbarModule,
//       MatCardModule,
//       MatButtonModule,
//       MatInputModule,
//       MatIconModule,
//       MatDatepickerModule,
//       MatNativeDateModule

//     ),
//   ],
// };

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';


import { routes } from './app.routes'; 


import { TokenInterceptor } from './services/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes),
    

    provideHttpClient(withInterceptorsFromDi()), 
    

    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true 
    }

  ]
};