import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  authForm: FormGroup;

  correctPass: boolean = true;

  constructor(
    private builder: FormBuilder,
    private clientServices: UsuarioService,
    private route: Router
  ) {
    this.authForm = this.builder.group({
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      pass: ['', Validators.required],
      pass_confirm: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  goLogin(): void{
    this.route.navigate(['login']);
  }

  // tslint:disable-next-line:typedef
  async registrar(){
      const objUser = {
        username: this.authForm.get('username')?.value,
        password: this.authForm.get('pass')?.value,
        first_name: this.authForm.get('firstname')?.value,
        last_name: this.authForm.get('lastname')?.value,
        nivel_id: 1,
      };
      await this.clientServices.insertar(objUser);
      await this.route.navigate(['/']);
  }
}
