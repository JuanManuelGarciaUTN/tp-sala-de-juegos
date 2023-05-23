import { Component } from '@angular/core';
import { PreguntasService } from './services/preguntas.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {

  constructor(private preguntas: PreguntasService) { 

    const sub1 = this.preguntas.obtenerPreguntaArte().subscribe(pregunta=>{
		console.log("arte");
		console.log(pregunta);
		sub1.unsubscribe();
	}
    )
	const sub2 = this.preguntas.obtenerPreguntaCiencia().subscribe(pregunta=>{
		console.log("ciencia");
		console.log(pregunta);
		sub2.unsubscribe();
	}
    )
	const sub3 = this.preguntas.obtenerPreguntaDeportes().subscribe(pregunta=>{
		console.log("deportes");
		console.log(pregunta);
		sub3.unsubscribe();
	}
    )
	const sub4 = this.preguntas.obtenerPreguntaEntretenimiento().subscribe(pregunta=>{
		console.log("entretenimiento");
		console.log(pregunta);
		sub4.unsubscribe();
	}
    )
	const sub5 = this.preguntas.obtenerPreguntaGeografia().subscribe(pregunta=>{
		console.log("geografia");
		console.log(pregunta);
		sub5.unsubscribe();
	})
	const sub6 = this.preguntas.obtenerPreguntaHistoria().subscribe(pregunta=>{
		console.log("Historia");
		console.log(pregunta);
		sub6.unsubscribe();
	})
  }
}
