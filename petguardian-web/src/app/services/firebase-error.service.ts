import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  firebaseError(code: String){
    switch(code){
      //Usuario no encontrado
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'Usuario no existe'
      //Contraseña Incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña Incorrecta'
      //Correo existe
      case FirebaseCodeErrorEnum.EmailInUse:
        return 'El usuario existe'
      //Weak password
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'Contraseña debil, almenos 6 caracteres'
      //Correo Invalido
      case FirebaseCodeErrorEnum.BadEmail:
        return 'Correo Invalido'
      case FirebaseCodeErrorEnum.InvalidLogin:
        return 'Credenciales no aceptadas'
      //Default
      default:
        return 'Error imprevisto'
    }

  }
}
