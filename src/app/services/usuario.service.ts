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

  iniciar(usuario: Usuario){
    this.usuario = usuario;
  }

  cerrar(){
    this.usuario = undefined;
  }

  testing(){
    this.usuario = {nombre: "TESTING-TESTING-TESTING-TESTING", 
                    password: "root",
                    puntajeMaxAhorcado: 1,
                    puntajeMaxBlackjack: 5,
                    puntajeMaxMayorMenor: 10,
                    puntajeMaxPreguntados: 25};
  }
}
