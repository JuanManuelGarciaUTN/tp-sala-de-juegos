import { Component } from '@angular/core';
import { MazoDeCartas } from 'src/app/entidades/mazo-de-cartas';
import { Carta } from 'src/app/interfaces/carta';
import { DbUsuariosService, TipoPuntaje } from 'src/app/services/db-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

enum Estado{
  gano,
  perdio,
  empato
}

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.scss']
})
export class MayorMenorComponent {

  public mazo = new MazoDeCartas(false);
  public cartaVisible?: Carta;
  public cartaAdivinar?: Carta;
  public mostrarMensajeFinal: boolean = false;
  public mensajeFinal: string= "";
  public estado: Estado = Estado.empato;
  public puntajeActual: number = 0;

  constructor(private user: UsuarioService,
              private db: DbUsuariosService){
	if(this.user.datos){
		this.puntajeActual = this.user.datos.puntajeMaxMayorMenor;
	}
    this.generarNuevaRonda();
  }

  get imagenCartaVisible(){
    return "../../../assets/juegos/cartas/"+this.cartaVisible?.codigo+".png";
  }

  get imagenCartaAdivinar(){
    let codigo = "0";
    if(this.cartaAdivinar){
      codigo = this.cartaAdivinar.codigo;
    }
    return "../../../assets/juegos/cartas/"+codigo+".png";
  }

  generarNuevaRonda(){
    if(this.mazo.restantes < 15){
      this.mazo.reiniciarMazo();
    }
    this.cartaAdivinar = undefined;
    this.cartaVisible = this.mazo.obtenerCarta();
    this.mostrarMensajeFinal = false;
    this.mensajeFinal = "";
  }

  private adivinar(){
    this.mostrarMensajeFinal = true;

    this.cartaAdivinar = this.mazo.obtenerCarta();
    if(this.cartaAdivinar?.valor == this.cartaVisible?.valor){
      this.empatar();
      return false;
    }
    return true;
  }

  adivinarMayor(){
    if(this.adivinar()){
      if(this.cartaAdivinar!.valor > this.cartaVisible!.valor){
        this.ganar();
      }
      else{
        this.perder();
      }
    }
  }

  adivinarMenor(){
    if(this.adivinar()){
      if(this.cartaAdivinar!.valor < this.cartaVisible!.valor){
        this.ganar();
      }
      else{
        this.perder();
      }
    }
  }

  private ganar(){
    this.estado = Estado.gano;
    this.mensajeFinal = "GANASTE 1 PUNTO"; 
    this.guardarPuntaje();
  }

  private perder(){
    this.estado = Estado.perdio;
    this.mensajeFinal = "PERDISTE";
  }

  private empatar(){
	this.estado = Estado.empato;
    this.mensajeFinal = "EMPATE";
  }

  private guardarPuntaje(){
	this.puntajeActual += 1;
    if(this.user.datos?.id){
      this.user.datos.puntajeMaxMayorMenor = this.puntajeActual;
      this.db.actulizarPuntaje(TipoPuntaje.mayorMenor, this.user.datos.id, this.user.datos.puntajeMaxMayorMenor);
    }
  }
}
