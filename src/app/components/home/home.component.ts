import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import Usuario from 'src/app/interfaces/usuario.interface';
import { DbUsuariosService, TipoPuntaje } from 'src/app/services/db-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public topAhorcado: Array<Usuario> = [];
  public topPreguntados: Array<Usuario> = [];
  public topMayorMenor: Array<Usuario> = [];
  public topBlackjack: Array<Usuario> = [];
  private subscripcion:  Array<Subscription> = [];

  constructor(private _usuario: UsuarioService, private db: DbUsuariosService) {
    this.obtenerTopAhorcado();
    this.obtenerTopBlackjack();
    this.obtenerTopMayorMenor();
    this.obtenerTopPreguntados();
  }

  ngOnDestroy(){
    if(this.subscripcion)
    {
      for(let sub of this.subscripcion) {
        sub.unsubscribe();
      }
    }
  }
  get usuario(){
    return this._usuario;
  }

  private obtenerTopAhorcado(){
    const sub = this.db.obtenerTop(TipoPuntaje.ahorcado).subscribe(datos=>{
      this.topAhorcado = datos;
    })
    this.subscripcion.push(sub);
  }

  private obtenerTopBlackjack(){
    const sub = this.db.obtenerTop(TipoPuntaje.blackjack).subscribe(datos=>{
      this.topBlackjack = datos;
    })
    this.subscripcion.push(sub);
  }

  private obtenerTopMayorMenor(){
    const sub = this.db.obtenerTop(TipoPuntaje.mayorMenor).subscribe(datos=>{
      this.topMayorMenor = datos;
    })
    this.subscripcion.push(sub);
  }

  private obtenerTopPreguntados(){
    const sub = this.db.obtenerTop(TipoPuntaje.preguntados).subscribe(datos=>{
      this.topPreguntados = datos;
    })
    this.subscripcion.push(sub);
  }
}
