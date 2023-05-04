import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private data = new Subject<any>();

  constructor() { }

  enviarDatos(datos) {
    this.data.next(datos);
  }

  recibirDatos(): Observable<any> {
    return this.data.asObservable();
  }
}
