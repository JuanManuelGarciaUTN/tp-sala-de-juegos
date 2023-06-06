import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ]
})
export class RegistroModule { }
