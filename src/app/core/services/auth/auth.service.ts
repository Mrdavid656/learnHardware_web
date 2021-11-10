import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import { HttpClient } from '@angular/common/http';
import { of, Observable, EMPTY } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Login} from "../../../shared/interface/Auth/login";
import {environment} from "../../../../environments/environment";
import {Tokens} from "../../../shared/interface/Auth/token";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'access';
  private readonly REFRESH_TOKEN = 'refresh';
  private loggedUser: string | undefined | null;

  constructor(private http: HttpClient) { }

  login(user: Login): Observable<boolean> {
    return this.http.post<any>(`${environment.api.base}/api/token/`, user)
      .pipe(
        tap(tokens => {
          const decoded = helper.decodeToken(tokens.access);
          const type = decoded.user_type;
          this.doLoginUser(user.username, tokens);
        }),
        mapTo(true),
        catchError(error => {
          Swal.fire( 'Oops...', 'Credeciales Inconrrectas!', 'error');
          return of(false);
        }));
  }

  logout(): void {
    this.doLogoutUser();
  }

  // tslint:disable-next-line:typedef
  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // tslint:disable-next-line:typedef
  refreshToken() {
    return this.http.post<any>(`${environment.api.base}token/`, {
      refresh: this.getRefreshToken()
    });
  }

  // tslint:disable-next-line:typedef
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  // tslint:disable-next-line:typedef
  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  // tslint:disable-next-line:typedef
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  // tslint:disable-next-line:typedef
  getUser(){
    const token = this.getJwtToken();
    // @ts-ignore
    const decoded = helper.decodeToken(token);
    const user = {
      user_id: decoded.user_id,
      user_type: decoded.user_type
    };
    return user;
  }

  // tslint:disable-next-line:typedef
  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  // tslint:disable-next-line:typedef
  storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  // tslint:disable-next-line:typedef
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  // tslint:disable-next-line:typedef
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
