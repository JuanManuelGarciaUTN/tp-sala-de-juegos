import { Component, Renderer2 } from '@angular/core';
import { MazoDeCartas } from 'src/app/entidades/mazo-de-cartas';
import { Carta } from 'src/app/interfaces/carta';
import { DbUsuariosService, TipoPuntaje } from 'src/app/services/db-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss']
})
export class BlackjackComponent {
  public mensaje: string = "";
  public puntos: number;
  public apuesta: number = 0;
  public estado: EstadoBlackjack = EstadoBlackjack.apostando;
  private mazo: MazoDeCartas = new MazoDeCartas();
  private cartaOculta?: Carta;
  public manoDelJugador: Carta[] = [];
  public manoDeLaMaquina: Carta[] = [];
  public sumaJugador: number = 0;
  public sumaMaquina: number = 0;
  public tieneAsMaquina:EstadoAs = EstadoAs.noTiene;
  public tieneAsJugador:EstadoAs = EstadoAs.noTiene;

  constructor(private user: UsuarioService, 
    private db: DbUsuariosService,
    private preload: Renderer2
    ){
      
    this.preCargarImagenes(this.generarListaImagenes());
    this.puntos = this.user.datos?.puntajeMaxBlackjack || 500;
    this.iniciarJuego();
  }

  get estadosPosibles(){
    return EstadoBlackjack;
  }

  iniciarJuego(){
    this.mensaje = "";
    this.apuesta = 0;
    this.estado = EstadoBlackjack.apostando;
    this.manoDeLaMaquina = [];
    this.manoDelJugador = [];
    this.sumaJugador = 0;
    this.sumaMaquina = 0;
    this.tieneAsMaquina = EstadoAs.noTiene;
    this.tieneAsJugador = EstadoAs.noTiene;
    if(this.mazo.restantes < 28){
      this.mazo.reiniciarMazo();
    }
    if(this.puntos < 1){
      this.puntos = 500;
    }
  }

  apostar(valor:number){
    this.puntos -= valor;
    this.apuesta += valor;
  }

  repartir(){
    this.estado = EstadoBlackjack.repartiendo;
    setTimeout(() => {
      this.darCartaJugador();
      setTimeout(() => {
        this.darCartaMaquina();
        setTimeout(() => {
          this.darCartaJugador();
          setTimeout(() => {
            this.generarCartaOculta();
            if(this.sumaJugador == 21){
              this.iniciarTurnoMaquina();
            }
            else{
              this.estado = EstadoBlackjack.primerTurno;
            }     
          }, 250);
        }, 250);
      }, 250);
    }, 250);
  }

  pedirCarta(){
    this.estado = EstadoBlackjack.repartiendo;
    setTimeout(() => {
      this.darCartaJugador()
      if(this.sumaJugador > 21){
        this.perder();
      }
      else if (this.sumaJugador == 21){
        this.iniciarTurnoMaquina();
      }
      else{
        this.estado = EstadoBlackjack.otroTurno;
      }
    }, 100);
  }

  doblarApuesta(){
    this.estado = EstadoBlackjack.repartiendo;
    this.puntos -= this.apuesta;
    this.apuesta = this.apuesta * 2;
    setTimeout(() => {
      this.darCartaJugador();
      if(this.sumaJugador > 21){
        this.perder();
      }
      else{
        this.iniciarTurnoMaquina();
      }
    }, 100);
  }

  rendirse(){
    this.puntos += this.apuesta / 2;
    this.apuesta = this.apuesta / 2;
    this.perder();
  }

  public iniciarTurnoMaquina(){
    this.estado = EstadoBlackjack.turnoMaquina;
    this.mostrarCartaOculta();
    setTimeout(() => {
      if(this.manoDelJugador.length == 2 && this.sumaJugador == 21){
        if(this.sumaMaquina == 21){
          this.empatar();
        }
        else{
          this.ganar();
        }
      }
      else if(this.sumaMaquina > 16){
        this.calcularGanador();
      }
      else{
        this.maquinaPideCarta();
      }
    }, 500);
  }

  private maquinaPideCarta(){
    setTimeout(() => {
      this.darCartaMaquina();
      if(this.sumaMaquina > 21){
        this.ganar();
      }
      else if(this.sumaMaquina > 16){
        this.calcularGanador();
      }
      else{
        this.maquinaPideCarta();
      }
    },500);
  }

  private calcularGanador(){
    setTimeout(() => {
      if(this.sumaMaquina > this.sumaJugador){
        this.perder();
      }
      else if(this.sumaMaquina == this.sumaJugador){
        this.empatar();
      }
      else{
        this.ganar();
      }
    }, 750);
  }

  private darCartaJugador(){
    const carta = this.mazo.obtenerCarta();
    this.manoDelJugador.push(carta!);
    if(carta?.valor == 11){
      if(this.tieneAsJugador == EstadoAs.noTiene){
        this.sumaJugador += 11;
        this.tieneAsJugador = EstadoAs.tiene;
      }
      else{
        this.sumaJugador += 1;
      }
    } 
    else{
      this.sumaJugador += carta?.valor!;
    }
    if(this.sumaJugador > 21 && this.tieneAsJugador == EstadoAs.tiene){
      this.sumaJugador -= 10;
      this.tieneAsJugador = EstadoAs.supero21;
    }
  }

  private generarCartaOculta(){
    const carta = {codigo: "0", valor:0};
    this.manoDeLaMaquina.push(carta);
    this.cartaOculta = this.mazo.obtenerCarta();
  }

  private mostrarCartaOculta(){
    this.darCartaMaquina(this.cartaOculta);
  }

  private darCartaMaquina(cartaOculta: Carta|undefined = undefined){
    let carta;
    if(cartaOculta){
      carta = cartaOculta;
      this.manoDeLaMaquina.pop();
    }
    else{
      carta = this.mazo.obtenerCarta();
    }
    this.manoDeLaMaquina.push(carta!);
    if(carta?.valor == 11){
      if(this.tieneAsMaquina == EstadoAs.noTiene){
        this.sumaMaquina += 11;
        this.tieneAsMaquina = EstadoAs.tiene;
      }
      else{
        this.sumaMaquina += 1;
      }
    } 
    else{
      this.sumaMaquina += carta?.valor!;
    }
    if(this.sumaMaquina > 21 && this.tieneAsMaquina == EstadoAs.tiene){
      this.sumaMaquina -= 10;
      this.tieneAsMaquina = EstadoAs.supero21;
    }
  }

  private perder(){
    this.mensaje = "PERDISTE "+this.apuesta+" PUNTOS";
    this.estado = EstadoBlackjack.juegoPerdido;
    this.guardarPuntaje();
  }

  private ganar(){
    this.puntos += this.apuesta
    if(this.manoDelJugador.length == 2 && this.sumaJugador == 21){
      this.apuesta *= 1.5;
      this.mensaje = "BLACKJACK!!! ";
    }
    this.puntos += this.apuesta
    this.mensaje += "GANASTE "+this.apuesta+" PUNTOS";
    this.estado = EstadoBlackjack.juegoGanado;
    this.guardarPuntaje();
  }

  private empatar(){
    this.puntos += this.apuesta
    this.mensaje = "EMPATE";
    this.estado = EstadoBlackjack.juegoEmpatado;
  }

  private guardarPuntaje(){
    if(this.user.datos?.id){
        this.user.datos.puntajeMaxBlackjack = this.puntos;
        this.db.actulizarPuntaje(TipoPuntaje.blackjack, this.user.datos.id, this.user.datos.puntajeMaxBlackjack);
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
    for(let i = 1;i< 14; i++){
      imagenes.push(textoBase+"P"+i+".png");
      imagenes.push(textoBase+"D"+i+".png");
      imagenes.push(textoBase+"C"+i+".png");
      imagenes.push(textoBase+"T"+i+".png");
    }
    return imagenes;
  }
}

enum EstadoBlackjack{
  apostando,
  repartiendo,
  primerTurno,
  otroTurno,
  turnoMaquina,
  juegoGanado,
  juegoPerdido,
  juegoEmpatado
}
enum EstadoAs{
  noTiene,
  tiene,
  supero21
}
