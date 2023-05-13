import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mensaje } from 'src/app/interfaces/mensaje';
import { DbMensajesService } from 'src/app/services/db-mensajes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  
  public chatActivo:boolean = false;
  public mensajes: Mensaje[] = [];
  public nuevoMensaje = "";
  private observableMensajes: Subscription;

  constructor(private usuario: UsuarioService, private dbMensajes: DbMensajesService){
    this.observableMensajes = this.dbMensajes.obtenerMensajes().subscribe(data=>{
      data = data.reverse();
      this.mensajes = data;
    })
  }

  ngDestroy(){
    this.observableMensajes.unsubscribe();
  }
  abrirChat(){
    this.chatActivo = true;
    setTimeout(() => {
      let chat = document.getElementById("chat");
      console.log(chat);
      if(chat){
        chat.scrollTop += chat.scrollHeight;
      }
    }, 250);
  }

  cerrarChat(){
    this.chatActivo = false;
  }

  enviarMensaje(){
    console.log(this.usuario.datos && this.nuevoMensaje != "");
    console.log(this.nuevoMensaje);
    console.log(this.usuario.datos);
    if(this.usuario.datos && this.nuevoMensaje != ""){
      const hora = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US', '+0530');
      const mensaje : Mensaje = {autor: this.usuario.datos.nombre, hora: hora, texto: this.nuevoMensaje}; 
      this.dbMensajes.guardarMensaje(mensaje)
      this.nuevoMensaje = "";
    }
  }

  formatearMensaje(mensaje: Mensaje){
    const hora = formatDate(mensaje.hora, "hh:mm", 'en-US', '+0530');
    const autor = mensaje.autor.split("@")[0];
    return  hora+"| " + autor + ": " + mensaje.texto;
  }
}

