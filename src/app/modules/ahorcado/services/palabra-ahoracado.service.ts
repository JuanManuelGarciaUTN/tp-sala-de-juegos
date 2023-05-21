import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, query, where, collectionData, getDocs, DocumentData, getDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable, from, map } from 'rxjs';
import { PalabraDb } from '../interfaces/palabra-db';

@Injectable({
  providedIn: 'root'
})
export class PalabraAhoracadoService {

  constructor(private http: HttpClient, private firestore: Firestore) { }

  obtenerPalabra(): Observable<PalabraDb|undefined>{
    const index = this.random(0, 2444);

    const docRef  = doc(this.firestore, "palabras", index.toString());

    return from(getDoc(docRef)).pipe(
      map((snapshot) => snapshot.data()),
    ) as Observable<PalabraDb|undefined>;
  }

  formatearPalabra(palabra: string){
    return palabra.toLowerCase().replace(" ","").replace("  ","").replace("   ","");
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
