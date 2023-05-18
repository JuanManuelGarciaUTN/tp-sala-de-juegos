import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public nombreUsuario: string|undefined;
  constructor(public usuario: UsuarioService) { }

  cerrarSesion(){
    this.usuario.cerrar();
    this.nombreUsuario = undefined;
  }
}
