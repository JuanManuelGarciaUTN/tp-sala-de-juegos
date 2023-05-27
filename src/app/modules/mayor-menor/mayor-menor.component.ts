import { Component, Renderer2 } from '@angular/core';
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
              private db: DbUsuariosService,
              private preload: Renderer2){
    this.preCargarImagenes(this.generarListaImagenes());
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

  private preCargarImagenes(imagenUrls: string[]): void {
    imagenUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      this.preload.appendChild(document.body, img);
      document.body.removeChild(img);
    });
  }
  private generarListaImagenes(){
    let imagenes = [];
    const textoBase = "../../../assets/juegos/cartas/";
    for(let i = 1;i< 11; i++){
      imagenes.push(textoBase+"P"+i+".png");
      imagenes.push(textoBase+"D"+i+".png");
      imagenes.push(textoBase+"C"+i+".png");
      imagenes.push(textoBase+"T"+i+".png");
    }
    return imagenes;
  }
}
