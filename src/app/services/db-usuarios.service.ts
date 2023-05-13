import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where, getDoc, getDocs } from '@angular/fire/firestore';
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
    let dateNow = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530');
    const log: LogSesion = {nombre: usuario.nombre, tiempo: dateNow};
   
    return addDoc(coleccion, log);
  }
}
