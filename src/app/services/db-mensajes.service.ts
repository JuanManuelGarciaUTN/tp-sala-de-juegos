import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, limit, orderBy, query } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import { Mensaje } from '../interfaces/mensaje';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DbMensajesService {

  constructor(private firestore: Firestore) { }

  guardarMensaje(mensaje: Mensaje){
    const col = collection(this.firestore, "mensajes");
    return addDoc(col, mensaje);
  }

  obtenerMensajes(): Observable<Mensaje[]>{
    const coleccion = collection(this.firestore, "mensajes");
    const q = query(coleccion, orderBy("hora", "desc"), limit(100));
    return collectionData(q) as Observable<Mensaje[]>;
  }
}
