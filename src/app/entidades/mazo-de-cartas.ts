import { Carta } from "../interfaces/carta";

export class MazoDeCartas {

    private _cartas: Carta[];
    private _cartasUsadas: Carta[];

    constructor(completo = true){
        this._cartasUsadas = [];
        this._cartas = [];
        if(completo){
            this.generarMazoCompleto();
        }
        else{
            this.generarMazoDe10();
        }

        this.mezclarMazo();
    }

    public get restantes():number{
        return this._cartas.length;
    }

    public mezclarMazo() {
        for (let i = this._cartas.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this._cartas[i], this._cartas[j]] = [this._cartas[j], this._cartas[i]];
        }
    }

    public obtenerCarta():Carta|undefined{
        const carta = this._cartas.pop();
        if(carta)
            this._cartasUsadas.push(carta);
        return carta;
    }

    public reiniciarMazo(){
        this._cartas.push(...this._cartasUsadas);
        this._cartasUsadas = [];
        this.mezclarMazo();
    }

    private generarMazoDe10(){
        for(let i = 1; i <= 10; i++){
            let pica: Carta = {codigo: "P"+i, valor: i}; 
            let corazon: Carta = {codigo: "C"+i, valor: i}; 
            let trevol: Carta = {codigo: "T"+i, valor: i}; 
            let diamante: Carta = {codigo: "D"+i, valor: i};
            this._cartas.push(pica,corazon,trevol,diamante);
        }
    }
    private generarMazoCompleto(){
        let pica: Carta = {codigo: "P1", valor: 11}; 
        let corazon: Carta = {codigo: "C1", valor: 11}; 
        let trevol: Carta = {codigo: "T1", valor: 11}; 
        let diamante: Carta = {codigo: "D1", valor: 11};
        this._cartas.push(pica,corazon,trevol,diamante);
        for(let i = 2; i < 10; i++){
            let pica: Carta = {codigo: "P"+i, valor: i}; 
            let corazon: Carta = {codigo: "C"+i, valor: i}; 
            let trevol: Carta = {codigo: "T"+i, valor: i}; 
            let diamante: Carta = {codigo: "D"+i, valor: i};
            this._cartas.push(pica,corazon,trevol,diamante);
        }
        for(let i = 10; i < 14; i++){
            let pica: Carta = {codigo: "P"+i, valor: 10}; 
            let corazon: Carta = {codigo: "C"+i, valor: 10}; 
            let trevol: Carta = {codigo: "T"+i, valor: 10}; 
            let diamante: Carta = {codigo: "D"+i, valor: 10};
            this._cartas.push(pica,corazon,trevol,diamante);
        }
    }
}
