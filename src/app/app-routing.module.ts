import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { AhorcadoComponent } from './modules/ahorcado/ahorcado.component';
import { QuienSoyComponent } from './modules/quien-soy/quien-soy.component';
import { NoLogueadoGuard } from './guards/no-logueado.guard';
import { PreguntadosComponent } from './modules/preguntados/preguntados.component';
import { MayorMenorComponent } from './modules/mayor-menor/mayor-menor.component';
import { BlackjackComponent } from './modules/blackjack/blackjack.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  { 
    path: "login", 
    component: LoginComponent,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    canActivate: [NoLogueadoGuard]
  },
  { 
    path: "registro", 
    component: RegistroComponent,
    loadChildren: () => import('./modules/registro/registro.module').then(m => m.RegistroModule),
    canActivate: [NoLogueadoGuard]
  },
  { 
    path: "quien-soy", 
    component: QuienSoyComponent,
    loadChildren: () => import('./modules/quien-soy/quien-soy.module').then(m => m.QuienSoyModule)
  },
  { 
    path: "juegos/ahorcado", 
    component: AhorcadoComponent,
    loadChildren: () => import('./modules/ahorcado/ahorcado.module').then(m => m.AhorcadoModule)
  },
  { 
    path: "juegos/preguntados", 
    component: PreguntadosComponent,
    loadChildren: () => import('./modules/preguntados/preguntados.module').then(m => m.PreguntadosModule)
  },
  { 
    path: "juegos/mayor-menor", 
    component: MayorMenorComponent,
    loadChildren: () => import('./modules/mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule)
  },
  { 
    path: "juegos/blackjack", 
    component: BlackjackComponent,
    loadChildren: () => import('./modules/blackjack/blackjack.module').then(m => m.BlackjackModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
