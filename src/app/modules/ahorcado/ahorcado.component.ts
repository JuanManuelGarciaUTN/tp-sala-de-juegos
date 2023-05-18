import { Component } from "@angular/core";

@Component({
  selector: "app-ahorcado",
  templateUrl: "./ahorcado.component.html",
  styleUrls: ["./ahorcado.component.scss"]
})
export class AhorcadoComponent {
  palabrasPosibles: string[] = ["angular", "typescript", "auto", "periodista", "programador"];
  palabra: Array<string> = []; 
  errores: number = 0; 
  letrasSeleccionadas: string[] = []; 
  abecedario: string[] = "abcdefghijklmnñopqrstuvwxyz".split(""); 
  imagenAhorcado: string[] = ["../../../assets/juegos/ahorcado/hangman-0.png", "../../../assets/juegos/ahorcado/hangman-1.png", "../../../assets/juegos/ahorcado/hangman-2.png", "../../../assets/juegos/ahorcado/hangman-3.png", "../../../assets/juegos/ahorcado/hangman-4.png", "../../../assets/juegos/ahorcado/hangman-5.png", "../../../assets/juegos/ahorcado/hangman-6.png"];
  mostrarMensajeFinal: boolean = false; 
  mensajeFinal: string = "";

  constructor() {
    this.nuevoJuego();
  }

  nuevoJuego(): void {
    this.palabra = this.obtenerPalabra().split("");
    this.errores = 0;
    this.letrasSeleccionadas = [];
    this.mostrarMensajeFinal = false;
  }

  obtenerPalabra(): string {
    const randomIndex = Math.floor(Math.random() * this.palabrasPosibles.length);
    return this.palabrasPosibles[randomIndex];
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
      this.mostrarMensajeFinal = true;
      this.mensajeFinal = "PERDISTE!";
    }
  }

  calcularVictoria(): boolean {
    return this.palabra.every(letras => this.letrasSeleccionadas.includes(letras));
  }

  calcularDerrota(): boolean {
    return this.errores == 6;
  }
}
