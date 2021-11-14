import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import * as moment from 'moment';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import {CATEGORIAS_LECCION} from "../../core/enums/Enums";
import {HistorialService} from "../../core/services/historial.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm | undefined;

  profileForm: FormGroup;

  currrentUser: any;

  historico: any[] = [];

  constructor(
    private authService: AuthService,
    private clientServices: UsuarioService,
    private historialService: HistorialService
  ) {
    this.profileForm = new FormGroup({
      first_name: new FormControl({value: '', disabled: true}, Validators.required),
      last_name: new FormControl({value: '', disabled: true}, Validators.required),
      categoria: new FormControl({value: '', disabled: true}, Validators.required),
      username: new FormControl({value: '', disabled: true}, Validators.required),
      puntos: new FormControl({value: '', disabled: true}, Validators.required),
      nivel: new FormControl({value: '', disabled: true}, Validators.required),
    });
  }

  async ngOnInit() {
    this.currrentUser = await this.clientServices.get(await this.authService.getUser().user_id);
    this.profileForm.get('first_name')?.setValue(this.currrentUser.first_name);
    this.profileForm.get('last_name')?.setValue(this.currrentUser.last_name);
    this.profileForm.get('categoria')?.setValue(CATEGORIAS_LECCION[this.currrentUser.categoria]);
    this.profileForm.get('username')?.setValue(this.currrentUser.username);
    this.profileForm.get('puntos')?.setValue(this.currrentUser.puntos);
    this.profileForm.get('nivel')?.setValue(this.currrentUser.nivel.nombre);
    this.historico = await this.historialService.obtenerHistorial({usuario: this.currrentUser.id});
    this.historico.forEach(h => {
      h.date = moment(h.date).format('DD/MM/YYYY');
    })
  }

}
