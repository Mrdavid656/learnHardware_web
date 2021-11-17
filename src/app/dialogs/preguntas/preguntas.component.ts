import {Component, Inject, OnInit,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {HistorialService} from "../../core/services/historial.service";
import Swal from "sweetalert2";
import {LogrosService} from "../../core/services/logros.service";
import {LogroComponent} from "../logro/logro.component";

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
})
export class PreguntasComponent implements OnInit {

  pos = 0;
  isVisibleAws = false;

  isVisibleFin = false;

  puntaje = 0;

  opcionSeleccionada: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<PreguntasComponent>,
    private historialService: HistorialService,
    private authService: AuthService,
    private logrosService: LogrosService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  opcion_checked(value: any){
    this.opcionSeleccionada = value;
  }

  async showModalAws(): Promise<void> {
    this.isVisibleAws = true;
    if (this.opcionSeleccionada.opcion_correcta){
      this.puntaje += 10;
      const objHistorial = {
        puntos: 10,
        trivia_id: this.data[this.pos].id,
        usuario: this.authService.getUser().user_id
      }
      const data = await this.historialService.registrarPuntos(objHistorial);
      if (data['levelup']){
        Swal.fire('Felicidades subiste de nivel', '', 'success');
      }
    }else{
      const objHistorial = {
        puntos: 0,
        trivia_id: this.data[this.pos].id,
        usuario: this.authService.getUser().user_id
      }
      await this.historialService.registrarPuntos(objHistorial);
    }

    try {
      const logros = await this.logrosService.listar({
        usuario: this.authService.getUser().user_id
      });
      if(logros.length > 0){
        this.dialog.open(LogroComponent, {
          data: logros
        });
      }
    }catch (e){
      console.log(e);
    }

    this.pos++;
    if (this.pos > this.data.length-1){
      this.pos--;
      this.isVisibleAws = false;
      this.isVisibleFin = true;
    }
  }

  cerrar(data?: any): void {
    this.dialogref.close(data);
  }

  handleOk(): void {
    this.isVisibleAws = false;
  }

  handleFin(): void{
    this.isVisibleFin = false;
    this.cerrar(this.puntaje);
  }

  handleCancel(): void {
    this.isVisibleAws = false;
  }

}
