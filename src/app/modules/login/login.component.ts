import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbUsuariosService } from 'src/app/services/db-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public formularioLogin: FormGroup;
  public loginInvalido: boolean = false;
  public validando: boolean = false;

  constructor(
    private dbUsuarios: DbUsuariosService, 
    private login: UsuarioService,
    private router: Router) {
    this.formularioLogin = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.minLength(16), Validators.required])
    })
  }

  logear(){
      this.limpiarEspacios();
      this.loginInvalido = false;
      this.validando = true;
      const usuario = this.formularioLogin.value;
      const sub = this.dbUsuarios.obtenerUsuarios().subscribe(listaUsuarios=>{
        sub.unsubscribe();
        this.validando = false;
        
        for(let datos of listaUsuarios){
          if(datos.nombre == usuario.nombre && datos.password == usuario.password){
            datos.password = "";
            this.login.iniciar(datos);
            this.dbUsuarios.generarLogUsuario(usuario);
            this.router.navigate(["/home"]);
            return;
          }
        }
        this.loginInvalido = true;
      });
  }

  private limpiarEspacios(){
    this.formularioLogin.get('nombre')?.setValue(this.formularioLogin.get('nombre')?.value.trim());
    this.formularioLogin.get('password')?.setValue(this.formularioLogin.get('password')?.value.trim());
  }

  completarLoginRapido(){
    this.formularioLogin.get("nombre")?.setValue("testing@testing.com");
    this.formularioLogin.get("password")?.setValue("rootrootrootroot");
  }
}
