import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {

  isCollapsed = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {}

  cerrarSesion() {
    Swal.fire({
      title: 'Estas seguro que deseas cerrar sesion?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Te extrañaremos', '', 'info');
        this.authService.logout();
        this.router.navigate(['login']);
      } else if (result.isDenied) {
        Swal.fire(':D', '', 'success')
      }
    })

  }

}
