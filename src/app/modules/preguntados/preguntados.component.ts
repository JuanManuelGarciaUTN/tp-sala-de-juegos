import { Component } from '@angular/core';
import { PreguntasService } from './services/preguntas.service';
import { Respuesta } from './interfaces/respuesta';
import { Pregunta } from './interfaces/pregunta';
import { DbUsuariosService, TipoPuntaje } from 'src/app/services/db-usuarios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {
	public generandoPregunta = false;
	public mostrandoMensajeFinal = false;
	public gano = false;
	public mensajeFinal = "";
	public pregunta = "";
	public tema = "";
	public respuestas: Respuesta[] = [];

  constructor(private preguntas: PreguntasService, 
	private db: DbUsuariosService,
	private user: UsuarioService) {}

  ngOnInit() {
	this.iniciarJuego();
  }

  iniciarJuego(){
	this.generandoPregunta = true;
	this.mostrandoMensajeFinal = false;
	this.mensajeFinal = "";
	this.pregunta = "Generando Pregunta...";
	this.obtenerPreguntaAleatoria();
  }

  seleccionarRespuesta(estado: boolean){
	if(estado){
		this.ganar();
	}
	else{
		this.perder();
	}
	this.mostrandoMensajeFinal = true;
  }

  private ganar(){
    if(this.user.datos?.id){
		this.user.datos.puntajeMaxPreguntados++;
		this.db.actulizarPuntaje(TipoPuntaje.preguntados, this.user.datos.id, this.user.datos.puntajeMaxPreguntados);
	  }
	
	this.gano = true;
	this.mensajeFinal="RESPUESTA CORRECTA!!";
  }

  private perder(){
	this.gano = false;
	this.mensajeFinal="RESPUESTA INCORRECTA :c";
  }

  private obtenerPreguntaAleatoria(){
	switch (this.random(0,5)){
		case 0:
			this.tema = "Historia";
			this.obtenerPreguntaHistoria();
			break;
		case 1:
			this.tema = "Ciencia";
			this.obtenerPreguntaCiencia();
			break;
		case 2:
			this.tema = "Arte";
			this.obtenerPreguntaArte();
			break;
		case 3:
			this.tema = "Deportes";
			this.obtenerPreguntaDeportes();
			break;
		case 4:
			this.tema = "Geografia";
			this.obtenerPreguntaGeografia();
			break;
		case 5:
			this.tema = "Entretenimiento";
			this.obtenerPreguntaEntretenimiento();
			break;
	}
  }

  private obtenerPreguntaGeografia(){
	const sub = this.preguntas.obtenerPreguntaGeografia().subscribe((datos: Pregunta)=>{
		this.asignarPreguntaRespuestas(datos);
		sub.unsubscribe();})
  }


  private obtenerPreguntaHistoria(){
	const sub = this.preguntas.obtenerPreguntaHistoria().subscribe((datos: Pregunta)=>{
		this.asignarPreguntaRespuestas(datos);
		sub.unsubscribe();})
  }

  private obtenerPreguntaCiencia(){
	const sub = this.preguntas.obtenerPreguntaCiencia().subscribe((datos: Pregunta)=>{
		this.asignarPreguntaRespuestas(datos);
		sub.unsubscribe();})
  }

  private obtenerPreguntaArte(){
	const sub = this.preguntas.obtenerPreguntaArte().subscribe((datos: Pregunta)=>{
		this.asignarPreguntaRespuestas(datos);
		sub.unsubscribe();})
  }

  private obtenerPreguntaDeportes(){
	const sub = this.preguntas.obtenerPreguntaDeportes().subscribe((datos: Pregunta)=>{
		this.asignarPreguntaRespuestas(datos);
		sub.unsubscribe();})
  }

  private obtenerPreguntaEntretenimiento(){
	const sub = this.preguntas.obtenerPreguntaEntretenimiento().subscribe((datos: Pregunta)=>{
		this.asignarPreguntaRespuestas(datos);
		sub.unsubscribe();})
  }
  private asignarPreguntaRespuestas(datos: Pregunta){
	this.generandoPregunta = false
	this.pregunta = datos.p;
	this.respuestas[0] = {respuesta: datos.r, estado:true};
	this.respuestas[1] = {respuesta: datos.i1, estado:false};
	this.respuestas[2] = {respuesta: datos.i2, estado:false};
	this.respuestas[3] = {respuesta: datos.i3, estado:false};
	this.mezclarRespuestas();
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private mezclarRespuestas(){
	for (let i = this.respuestas.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[this.respuestas[i], this.respuestas[j]] = [this.respuestas[j], this.respuestas[i]];
	  }
  }
}
