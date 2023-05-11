import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public formularioLogin: FormGroup;

  constructor() {
    this.formularioLogin = new FormGroup({
      usuario: new FormControl("", [Validators.maxLength(30), Validators.required]),
      password: new FormControl("", [Validators.minLength(16), Validators.required])
    })
  }

  logear(){
    console.log(this.formularioLogin.getRawValue());
  }
}
