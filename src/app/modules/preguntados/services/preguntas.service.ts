import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from '../interfaces/pregunta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private api = "https://example-api-ld94.onrender.com/";
  constructor(private http: HttpClient) { }

  obtenerPreguntaArte(){
    return this.http.get(this.api+"arte") as Observable<Pregunta>;
  }

  obtenerPreguntaDeportes(){
    return this.http.get(this.api+"deporte") as Observable<Pregunta>;
  }

  obtenerPreguntaHistoria(){
    return this.http.get(this.api+"historia") as Observable<Pregunta>;
  }

  obtenerPreguntaEntretenimiento(){
    return this.http.get(this.api+"entretenimiento") as Observable<Pregunta>;
  }

  obtenerPreguntaGeografia(){
    return this.http.get(this.api+"geografia") as Observable<Pregunta>;
  }

  obtenerPreguntaCiencia(){
    return this.http.get(this.api+"ciencia") as Observable<Pregunta>;
  }
}
