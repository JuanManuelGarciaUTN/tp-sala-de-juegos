import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabraAhoracadoService {

  constructor(private http: HttpClient) { }

  obtenerPalabra(): Observable<Array<string>>{
    const longitud = this.random(4, 8);
    return this.http.get("https://random-word-api.herokuapp.com/word?lang=es&length="+longitud) as  Observable<Array<string>>;
  }

  formatearPalabra(palabra: string){
    return palabra.toLowerCase()
            .replace("á","a")
            .replace("é","a")
            .replace("í","a")
            .replace("ú","a")
            .replace("ó","a")
            .replace("ü","u")
            .replace(" ","")
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
