import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private route: Router,
  ) {
    this.authForm = this.builder.group({
      username: ['', [Validators.required]],
      pass: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  login() {
    const userObj: any = {
      password: this.authForm.get('pass')?.value,
      username: this.authForm.get('username')?.value
    };
    this.auth.login(userObj).subscribe(
      (res) => {
        if (res) {
          localStorage.setItem('user', 'true');
          this.route.navigate(['/']);
          Swal.fire('Bienvenido nuevamente', '♥', 'success');
        }
      }, err => {
        console.log(err);
      }
    );
  }
}
