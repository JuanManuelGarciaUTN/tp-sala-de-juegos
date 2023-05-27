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
  private observableMensajes?: Subscription;

  constructor(private usuario: UsuarioService, private dbMensajes: DbMensajesService){}

  get usuarioLogeado():boolean{
    return this.usuario.datos !== undefined;
  }
  ngDestroy(){
    if(this.observableMensajes)
      this.observableMensajes.unsubscribe();
  }
  abrirChat(){
    this.observableMensajes = this.dbMensajes.obtenerMensajes().subscribe(data=>{
      data = data.reverse();
      this.mensajes = data;
    })
    this.chatActivo = true;
    this.scrollChatAbajo();
  }

  private scrollChatAbajo(){
    setTimeout(() => {
      let chat = document.getElementById("chat");
      if(chat){
        chat.scrollTop += chat.scrollHeight;
      }
    }, 250);
  }

  cerrarChat(){
    this.chatActivo = false;
  }

  enviarMensaje(){
    this.scrollChatAbajo();
    if(this.usuario.datos && this.nuevoMensaje != ""){
      let hora = new Date().toISOString()
      console.log(hora);
      const mensaje: Mensaje = {autor: this.usuario.datos.nombre, hora: hora, texto: this.nuevoMensaje}; 
      this.dbMensajes.guardarMensaje(mensaje)
      this.nuevoMensaje = "";
    }
  }

  formatearMensaje(mensaje: Mensaje){
    let fecha = new Date(mensaje.hora);
    
    const hora = fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false  });
    const autor = mensaje.autor.split("@")[0];
    return  hora+"| " + autor + ": " + mensaje.texto;
  }
}

