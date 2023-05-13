import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public topAhorcado: Array<any> = [{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100}];
  public topPreguntados: Array<any> = [{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100}];
  public topMayorMenor: Array<any> = [{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100}];
  public topBlackjack: Array<any> = [{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100},{name: "test", score: 100}];

  constructor(private usuario: UsuarioService) { }

  get datosUsuario(){
    return this.usuario.datos;
  }
}
