import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  public formularioRegistro: FormGroup;

  constructor() {
    this.formularioRegistro = new FormGroup({
      usuario: new FormControl("", [Validators.maxLength(30), Validators.required]),
      password: new FormControl("", [Validators.minLength(16), Validators.required]),
      repetirPassword: new FormControl("", [Validators.minLength(16), Validators.required]) 
    })
  }
  generarUsuario(){
    console.log(this.formularioRegistro.getRawValue());
  }
}
