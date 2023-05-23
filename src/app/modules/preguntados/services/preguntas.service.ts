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
    return this.http.get("https://api-preguntas-multiple-choice.cyclic.app/arte") as Observable<Pregunta>;
  }

  obtenerPreguntaDeportes(){
    return this.http.get("https://api-preguntas-multiple-choice.cyclic.app/deporte") as Observable<Pregunta>;
  }

  obtenerPreguntaHistoria(){
    return this.http.get("https://api-preguntas-multiple-choice.cyclic.app/historia") as Observable<Pregunta>;
  }

  obtenerPreguntaEntretenimiento(){
    return this.http.get("https://api-preguntas-multiple-choice.cyclic.app/entretenimiento") as Observable<Pregunta>;
  }

  obtenerPreguntaGeografia(){
    return this.http.get("https://api-preguntas-multiple-choice.cyclic.app/geografia") as Observable<Pregunta>;
  }

  obtenerPreguntaCiencia(){
    return this.http.get("https://api-preguntas-multiple-choice.cyclic.app/ciencia") as Observable<Pregunta>;
  }
}
