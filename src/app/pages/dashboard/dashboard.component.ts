import { Component, OnInit } from '@angular/core';
import { LeccionesService } from 'src/app/core/services/lecciones.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  components: any[] = [
    {
      name: 'CPU',
      method: '',
      children: [
        {
          className: 'cpu'
        }
      ]
    },
    {
      name: 'RAM',
      method: '',
      children: [
        {
          className: 'ram'
        }
      ]
    },
    {
      name: 'ALMACENAMIENTO',
      method: '',
      children: [
        {
          className: 'alm-sata'
        },
        {
          className: 'alm-m2'
        }
      ]
    },
    {
      name: 'RANURA EXPANSIÓN',
      method: '',
      children: [
        {
          className: 'es'
        },
        {
          className: 'es-2'
        },
        {
          className: 'es-3'
        },
      ]
    },
  ];

  lecciones: any[] = [];

  constructor(
    private leccionesService: LeccionesService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.lecciones = await this.leccionesService.listar();
    this.lecciones.forEach(leccion =>{
      leccion.activo = false;
    });
  }

  irLeccion(leccion: any){
    this.router.navigate(['leccion'], {
      state: { leccion: leccion }
    });
  }

}
