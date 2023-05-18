import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './ahorcado.component';

@NgModule({
  declarations: [AhorcadoComponent],
  exports: [AhorcadoComponent],
  imports: [CommonModule]
})
export class AhorcadoModule { }
