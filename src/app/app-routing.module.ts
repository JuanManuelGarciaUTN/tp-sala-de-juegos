import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AhorcadoComponent } from './modules/ahorcado/ahorcado.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "home", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "registro", component: RegistroComponent},
  { path: "quien-soy", component: QuienSoyComponent},
  { 
    path: "juegos/ahorcado", 
    component: AhorcadoComponent,
    loadChildren: () => import('./modules/ahorcado/ahorcado.module').then(m => m.AhorcadoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
