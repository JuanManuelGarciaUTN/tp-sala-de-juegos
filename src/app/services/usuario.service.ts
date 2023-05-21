import { Injectable } from '@angular/core';
import Usuario from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario: Usuario|undefined;
  constructor() { }

  get datos(): Usuario|undefined {
    return this.usuario;
  }

  get nombre(): string{
    return this.usuario?.nombre.split("@")[0] || "";
  }

  iniciar(usuario: Usuario){
    this.usuario = usuario;
  }

  cerrar(){
    this.usuario = undefined;
  }

  
}
