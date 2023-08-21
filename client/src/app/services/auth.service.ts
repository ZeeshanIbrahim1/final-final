import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { Patient } from '../models/patient';
import { Case } from '../models/case';
import { Appoint } from '../models/appoint';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { UpdatePatientComponent } from '../components/update-patient/update-patient.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000';
  private tokenKey = 'auth_token';
  private userIdKey = 'user_id';

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.userIdKey, userId);
  }

  removeUserId(): void {
    localStorage.removeItem(this.userIdKey);
  }
  getToken(): string | null {
    console.log("token")
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    console.log("tokend ",token)
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  userId: Pick<User, 'id'>;
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/auth/signup`, user)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup'))
      );
  }
  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{
    token: string;
    userId: Pick<User, 'id'>;
  }> {
    return this.http
      .post<{ token: string; userId: Pick<User, 'id'> }>(
        `${this.url}/auth/login`,
        { email: email, password: password }
      )
      .pipe(
        first(),
        tap((tokenObject: any) => {
          if (tokenObject && tokenObject.token && tokenObject.userId) {
            this.userId = tokenObject.userId;
            console.log("IN auth login", tokenObject.token)
            this.setToken(tokenObject.token);
            // localStorage.setItem('token', tokenObject.token);
            console.log("IN auth login 2", tokenObject.token)
            this.router.navigate(['/home']); // Ensure the route starts with a slash
          } else {
            console.error('Invalid server response format');
          }
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, 'id'>;
          }>('login')
        )
      );
  }
  signOut(){
    this.removeToken();
    this.router.navigate(['/login']);
  }
  
  

  // appoint(data): Observable<Appoint> {
  //   return this.http
  //     .post<Appoint>(`${this.url}/appoint`, data)
  //     .pipe(
  //       first(),
  //       catchError(this.errorHandlerService.handleError<Appoint>('appoint'))
  //     );
  // }
}
