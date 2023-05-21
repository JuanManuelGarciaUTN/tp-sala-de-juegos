import { Component } from "@angular/core";
import { PalabraAhoracadoService } from "./services/palabra-ahoracado.service";

@Component({
  selector: "app-ahorcado",
  templateUrl: "./ahorcado.component.html",
  styleUrls: ["./ahorcado.component.scss"]
})
export class AhorcadoComponent {
  palabra: Array<string> = ['E','l',' ','P','s','y',' ','K','o','n','g','r','o','o']; 
  errores: number = 0; 
  letrasSeleccionadas: string[] = []; 
  abecedario: string[] = "abcdefghijklmnñopqrstuvwxyz".split(""); 
  imagenAhorcado: string[] = ["../../../assets/juegos/ahorcado/hangman-0.png", "../../../assets/juegos/ahorcado/hangman-1.png", "../../../assets/juegos/ahorcado/hangman-2.png", "../../../assets/juegos/ahorcado/hangman-3.png", "../../../assets/juegos/ahorcado/hangman-4.png", "../../../assets/juegos/ahorcado/hangman-5.png", "../../../assets/juegos/ahorcado/hangman-6.png"];
  mostrarMensajeFinal: boolean = false; 
  generandoPalabra: boolean = true;
  mensajeFinal: string = "";

  constructor(private palabraRandom: PalabraAhoracadoService) {
    this.palabraRandom.guardarPalabras();
    this.nuevoJuego();
  }

  async nuevoJuego(): Promise<void> {
    this.generandoPalabra = true;
    this.palabra= ['E','l',' ','P','s','y',' ','K','o','n','g','r','o','o']; //Easter Egg 
    this.errores = 0;
    this.mostrarMensajeFinal = false;
    const sub = this.palabraRandom.obtenerPalabra().subscribe(palabra=>{
      this.palabra = this.palabraRandom.formatearPalabra(palabra[0]).split("");
      console.log(this.palabra);
      this.letrasSeleccionadas = [];
      this.letrasSeleccionadas.push(this.palabra[0], this.palabra[this.palabra.length-1]);
      this.generandoPalabra = false;
      sub.unsubscribe();
    })
  }

  intentarLetra(letras: string): void {
    this.letrasSeleccionadas.push(letras);

    if (!this.palabra.includes(letras)) {
      this.errores++;
    }

    if (this.calcularVictoria()) {
      this.mostrarMensajeFinal = true;
      this.mensajeFinal = "GANASTE!";
    } 
    else if (this.calcularDerrota()) {
      this.Perder();
    }
  }

  calcularVictoria(): boolean {
    return this.palabra.every(letras => this.letrasSeleccionadas.includes(letras));
  }

  calcularDerrota(): boolean {
    return this.errores == 6;
  }

  private Perder(){
    this.letrasSeleccionadas.push(...this.palabra);
    this.mostrarMensajeFinal = true;
    this.mensajeFinal = "PERDISTE!";
  }

}
