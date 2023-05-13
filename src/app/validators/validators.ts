import { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn, FormGroup } from '@angular/forms';
import { debounce, debounceTime, map, take } from 'rxjs';
import { DbUsuariosService } from '../services/db-usuarios.service';

export function confirmarClave(): ValidatorFn
{
  return (formGroup: AbstractControl): ValidationErrors | null =>
  {
    const password = formGroup.get('password');
    const repetirPassword = formGroup.get('repetirPassword');
    const error = { noCoincide: 'La Contraseña No Coincide'};

    if(password?.value !== repetirPassword?.value)
    {
      formGroup.get('repetirPassword')?.setErrors(error);
      return error;
    }
    else
    {
      formGroup.get('repetirPassword')?.setErrors(null);
      return null;
    }
  }
}

export function usuarioExiste(db: DbUsuariosService): AsyncValidatorFn
{
  return (control: AbstractControl) =>{
    const nombre = control.value.toLowerCase();
    return db.obtenerUsuarios().pipe(
        debounceTime(500),
        take(1),
        map(usuarios =>{
              for(let user of usuarios){
                if(user['nombre'] == nombre){
                  return {usuarioExiste: 'usuarioExiste'};
                }
              }
              return null;
            })
    )
  };
}