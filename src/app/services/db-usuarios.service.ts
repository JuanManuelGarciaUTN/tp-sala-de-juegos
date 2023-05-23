import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import Usuario from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';
import LogSesion from '../interfaces/logs-sesion.interface';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DbUsuariosService {

  constructor(private firestore: Firestore) { }

  guardarUsuario(usuario: Usuario){
    const coleccion = collection(this.firestore, "usuarios");
    usuario.nombre = usuario.nombre.toLowerCase();
    return addDoc(coleccion, usuario);
  }

  obtenerUsuarios(): Observable<Usuario[]>{
    const coleccion = collection(this.firestore, "usuarios");
    return collectionData(coleccion, {idField: 'id'}) as Observable<Usuario[]>;
  }

  generarLogUsuario(usuario: Usuario){
    const coleccion = collection(this.firestore, "logsSesion");
    usuario.nombre = usuario.nombre.toLowerCase();
    let dateNow = new Date().toISOString()
    const log: LogSesion = {nombre: usuario.nombre, tiempo: dateNow};
   
    return addDoc(coleccion, log);
  }

  actulizarPuntaje(tipo: TipoPuntaje, id: string, puntaje: number){
    const col = collection(this.firestore, "usuarios");
    const documento = doc(col, id);
    let datos: { [key in TipoPuntaje]: number } = {} as any;
    datos[tipo] = puntaje;
    updateDoc(documento, datos);
  }
}
export enum TipoPuntaje{
  ahorcado = "puntajeMaxAhorcado",
  blackjack = "puntajeMaxBlackjack",
  mayorMenor= "puntajeMaxMayorMenor",
  preguntados = "puntajeMaxPreguntados"
}
