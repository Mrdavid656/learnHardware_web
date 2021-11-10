import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { LeccionesService } from 'src/app/core/services/lecciones.service';
import {environment} from "../../../environments/environment";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PreguntasComponent} from "../../dialogs/preguntas/preguntas.component";
import Swal from "sweetalert2";
import {AuthService} from "../../core/services/auth/auth.service";
import {UsuarioService} from "../../core/services/usuario.service";
import {CATEGORIAS_LECCION} from "../../core/enums/Enums";

@Component({
  selector: 'app-lecciones',
  templateUrl: './lecciones.component.html',
  styleUrls: ['./lecciones.component.css'],
})
export class LeccionesComponent implements OnInit {

  leccion: any;
  keywords: any[];

  imagenes: any = [];

  constructor(
    private router: Router,
    private leccionesService: LeccionesService,
    public dialog: MatDialog,
    private authService: AuthService,
    private  usuarioService: UsuarioService,
  ) {
    this.leccion = this.router.getCurrentNavigation()?.extras.state?.leccion;
    this.keywords = this.leccion.keywords.split(',');
    const newKeys: any[] = [];
    this.keywords.forEach(key => {
      const key_link = 'https://www.google.com/search?q=' + key.trim();
      const objK = {
        link : key_link,
        key
      }
      newKeys.push(objK);
    })
    this.keywords = newKeys;

  }

  async ngOnInit() {
    this.imagenes = await this.leccionesService.obtenerImagenes(this.leccion.id);
    this.imagenes.forEach(( src: any ) => {
      src.archivo = environment.api.base + src.archivo;
    })
  }

  async iniciarPreguntas(){
    const preguntas = await this.leccionesService.obtenerPreguntas(this.leccion.id);
    if (preguntas.length > 0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.height = '90%';
      dialogConfig.width = '80%';
      dialogConfig.data = preguntas;
      const dialogref = this.dialog.open(PreguntasComponent, dialogConfig);
      dialogref.afterClosed().subscribe(async (result: any) => {
        console.log(result);
        if (result){
          if (result > 0){
            const currentUser = await this.usuarioService.get(this.authService.getUser().user_id);
            console.log(currentUser);
            console.log(this.leccion.categoria);
            if (this.leccion.categoria > currentUser.categoria ){
              let obj = {
                categoria: this.leccion.categoria,
              }
              try{
                await this.usuarioService.actualizarCategoria(this.authService.getUser().user_id, obj);
                Swal.fire('Felicidades por el ascenso', 'Avanzaste a la categoria ' + CATEGORIAS_LECCION[this.leccion.categoria], 'success');
              } catch (e) {
                console.error(e);
              }
            }
          }
        }
      });
    }else{
      Swal.fire('Leccion sin preguntas :(', 'Seguimos creando las mejores preguntas para ti :D', 'warning');
    }

  }

}
