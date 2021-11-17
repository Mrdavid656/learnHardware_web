import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LogrosService {

  private LECCION_PATH = environment.api.juego + 'user/logros/';

  constructor(private http: HttpClient) { }

  listar(logro: any): Promise<any[]>{
    return this.http.post<Array<any>>(`${this.LECCION_PATH}validate/`, logro).toPromise();
  }

}
