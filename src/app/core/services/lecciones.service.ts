import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class LeccionesService {

  LECCION_PATH = environment.api.juego + 'lecciones/';

  constructor(private http: HttpClient) { }

  listar(): Promise<any[]>{
    return this.http.get<Array<any>>(`${this.LECCION_PATH}`).toPromise();
  }

  insertar(leccion: any): Promise<any>{
    return this.http.post(`${this.LECCION_PATH}`, leccion).toPromise();
  }

  actualizar(id: number, leccion: any): Promise<any>{
    return this.http.put(`${this.LECCION_PATH}${id}/`, leccion).toPromise();
  }

  eliminar(id: number): Promise<any>{
    return this.http.delete(`${this.LECCION_PATH}${id}/`).toPromise();
  }

  obtenerImagenes(id: number): Promise<any[]>{
    return this.http.get<Array<any>>(`${this.LECCION_PATH}${id}/recursos/`).toPromise();
  }

  obtenerPreguntas(id: number): Promise<any[]>{
    return this.http.get<Array<any>>(`${this.LECCION_PATH}${id}/preguntas/`).toPromise();
  }
}
