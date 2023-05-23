import { Carta } from "../interfaces/carta";

export class MazoDeCartas {

    private _cartas: Carta[];
    private _cartasUsadas: Carta[];

    constructor(completo = true){
        this._cartasUsadas = [];
        this._cartas = [];
        let cantidad = completo ? 13 : 10;

        for(let i = 1; i <= cantidad; i++){
            let pica: Carta = {codigo: "P"+i, valor: i}; 
            let corazon: Carta = {codigo: "C"+i, valor: i}; 
            let trevol: Carta = {codigo: "T"+i, valor: i}; 
            let diamante: Carta = {codigo: "D"+i, valor: i};
            this._cartas.push(pica,corazon,trevol,diamante);
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
}
