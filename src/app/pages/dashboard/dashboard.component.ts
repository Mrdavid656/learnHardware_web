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
      children: [
        {
          className: 'cpu'
        }
      ]
    },
    {
      name: 'RAM',
      children: [
        {
          className: 'ram'
        }
      ]
    },
    {
      name: 'ALMACENAMIENTO',
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

  ver3D = false;

  constructor(
    private leccionesService: LeccionesService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.lecciones = await this.leccionesService.listar();
    console.log(this.lecciones);
    this.lecciones.forEach(leccion =>{
      leccion.activo = false;
    });
  }

  irLeccion(leccion: any){
    this.router.navigate(['leccion'], {
      state: { leccion: leccion }
    });
  }

  openList(component: any){
    this.lecciones.find(leccion => {
      if (leccion.titulo === component.name){
        leccion.activo = true;
      }
    })
    console.log(component);
  }

}
