import { Component } from '@angular/core';
import { MazoDeCartas } from 'src/app/entidades/mazo-de-cartas';
import { Carta } from 'src/app/interfaces/carta';
import { DbUsuariosService, TipoPuntaje } from 'src/app/services/db-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  public puntaje: number = 0;
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
    while(this.cartaVisible?.valor == 1 || this.cartaVisible?.valor == 10){
      this.cartaVisible = this.mazo.obtenerCarta();
    }
    this.mostrarMensajeFinal = false;
    this.mensajeFinal = "";
  }

  private adivinar(){
    const puntaje = this.calcularPuntaje();
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
    this.mensajeFinal = "GANASTE"; 
    this.guardarPuntaje();
  }

  private perder(){
    this.puntaje = this.puntaje - 7;
    this.mensajeFinal = "PERDISTE "; 
    this.guardarPuntaje();
  }

  private empatar(){
	this.puntaje = 0;
    this.mensajeFinal = "EMPATE";
  }

  private calcularPuntaje(){
    switch(this.cartaVisible?.valor){
		case 5:
		case 6:
			this.puntaje = 5;
			break;

		case 4:
		case 7:
			this.puntaje = 4;
			break;

		case 3:
		case 8:
			this.puntaje = 3;
			break;

		case 2:
		case 9:
			this.puntaje = 2;
			break;
    }
  }

  private guardarPuntaje(){
	this.puntajeActual += this.puntaje
    if(this.user.datos?.id && this.puntaje != 0){
      this.user.datos.puntajeMaxMayorMenor = this.user.datos.puntajeMaxMayorMenor + this.puntaje;
      this.db.actulizarPuntaje(TipoPuntaje.mayorMenor, this.user.datos.id, this.user.datos.puntajeMaxMayorMenor);
    }
  }
}
