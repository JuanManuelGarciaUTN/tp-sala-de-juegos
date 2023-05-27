import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Usuario from 'src/app/interfaces/usuario.interface';
import { DbUsuariosService } from 'src/app/services/db-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { confirmarClave } from 'src/app/validators/validators';
import { usuarioExiste } from 'src/app/validators/validators';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  public formularioRegistro: FormGroup;

  constructor(private dbUsuarios: DbUsuariosService, 
            private login: UsuarioService,
            private router: Router) {
    this.formularioRegistro = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.email], usuarioExiste(dbUsuarios)),
      password: new FormControl("", [Validators.minLength(16), Validators.required]),
      repetirPassword: new FormControl("", [Validators.minLength(16), Validators.required]) 
    }, [confirmarClave()]);
  }

  generarUsuario(){
    this.limpiarEspacios();
    let usuario: Usuario = {nombre: this.formularioRegistro.value.nombre,
                           password: this.formularioRegistro.value.password,
                           puntajeMaxAhorcado: 0,
                           puntajeMaxMayorMenor: 0,
                           puntajeMaxPreguntados: 0,
                           puntajeMaxBlackjack: 0};

    this.dbUsuarios.guardarUsuario(usuario);
    this.login.iniciar(usuario)
    this.dbUsuarios.generarLogUsuario(usuario);
    this.router.navigate(["/home"]);
  }

  private limpiarEspacios(){
    this.formularioRegistro.get('nombre')?.setValue(this.formularioRegistro.get('nombre')?.value.trim());
    this.formularioRegistro.get('password')?.setValue(this.formularioRegistro.get('password')?.value.trim());
    this.formularioRegistro.get('repetirPassword')?.setValue(this.formularioRegistro.get('repetirPassword')?.value.trim());
  }
}
