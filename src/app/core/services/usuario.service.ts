import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private LECCION_PATH = environment.api.usuarios + 'usuarios/';

  constructor(private http: HttpClient) { }

  listar(): Promise<any[]>{
    return this.http.get<Array<any>>(`${this.LECCION_PATH}`).toPromise();
  }

  obtenerLogros(usuarioId: number): Promise<any[]>{
    return this.http.get<Array<any>>(`${this.LECCION_PATH}${usuarioId}/logros/`).toPromise();
  }

  get(id: number): Promise<any>{
    return this.http.get<any>(`${this.LECCION_PATH}${id}/`).toPromise();
  }

  actualizarCategoria(id: number, categoria: any): Promise<any>{
    return this.http.patch<any>(`${this.LECCION_PATH}${id}/`, categoria).toPromise();
  }

  insertar(usr: any): Promise<any>{
    return this.http.post(`${this.LECCION_PATH}`, usr).toPromise();
  }

  actualizar(id: number, usr: any): Promise<any>{
    return this.http.put(`${this.LECCION_PATH}${id}/`, usr).toPromise();
  }

  eliminar(id: number): Promise<any>{
    return this.http.delete(`${this.LECCION_PATH}${id}/`).toPromise();
  }
}
