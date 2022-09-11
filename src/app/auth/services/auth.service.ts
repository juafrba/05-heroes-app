import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(
    private http: HttpClient,
  ) { }

  verifyAuth(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/users/${token}`)
      .pipe(
        map(auth => {
          this._auth = auth;
          return auth ? true : false;
        })
      );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id))
      );
  }

  logout(): void {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
