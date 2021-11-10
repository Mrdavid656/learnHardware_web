import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  LECCION_PATH = environment.api.juego + 'historial/';

  constructor(private http: HttpClient) { }

  listar(): Promise<any[]>{
    return this.http.get<Array<any>>(`${this.LECCION_PATH}`).toPromise();
  }

  obtenerHistorial(usuario: any): Promise<any[]>{
    return this.http.post<Array<any>>(`${this.LECCION_PATH}lecciones/`, usuario).toPromise();
  }


  registrarPuntos(historial: any): Promise<any>{
    return this.http.post(`${this.LECCION_PATH}`, historial).toPromise();
  }

  actualizar(id: number, historial: any): Promise<any>{
    return this.http.put(`${this.LECCION_PATH}${id}/`, historial).toPromise();
  }

  eliminar(id: number): Promise<any>{
    return this.http.delete(`${this.LECCION_PATH}${id}/`).toPromise();
  }
}
