import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pregunta } from '../interfaces/pregunta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(private http: HttpClient) { }

  obtenerPreguntaArte(){
    return this.http.get("https://example-api-ld94.onrender.com/arte") as Observable<Pregunta>;
  }

  obtenerPreguntaDeportes(){
    return this.http.get("https://example-api-ld94.onrender.com/deporte") as Observable<Pregunta>;
  }

  obtenerPreguntaHistoria(){
    return this.http.get("https://example-api-ld94.onrender.com/historia") as Observable<Pregunta>;
  }

  obtenerPreguntaEntretenimiento(){
    return this.http.get("https://example-api-ld94.onrender.com/entretenimiento") as Observable<Pregunta>;
  }

  obtenerPreguntaGeografia(){
    return this.http.get("https://example-api-ld94.onrender.com/geografia") as Observable<Pregunta>;
  }

  obtenerPreguntaCiencia(){
    return this.http.get("https://example-api-ld94.onrender.com/ciencia") as Observable<Pregunta>;
  }
}
