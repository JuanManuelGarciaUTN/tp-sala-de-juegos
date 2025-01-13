import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tp-sala-de-juegos';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const apiUrl = "https://example-api-ld94.onrender.com/arte"

    //HTTP request
    this.http.get(apiUrl).subscribe({
      next: () => {
        // La API del juego preguntados entra en estado inactiva despues de no ser usada por media hora
        // La solicitud al inicio de la pagina es para asegurarse que al momento de intentar jugar la API este activa
        console.log('API Inicializada en caso de inbernacion');
      },
      error: (err) => {
        console.error('Error API request:', err);
      }
    });
  }
}
