import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AhorcadoComponent],
  exports: [AhorcadoComponent],
  imports: [
    CommonModule,
  ]
})
export class AhorcadoModule { }
