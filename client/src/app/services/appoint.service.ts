import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Appoint } from '../models/appoint';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { UpdatePatientComponent } from '../components/update-patient/update-patient.component';

@Injectable({
  providedIn: 'root',
})
export class AppointService {
  private url = 'http://localhost:3000';
 
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}
 
  appoint(Appoint:any): Observable<Appoint> {
    console.log("IN appoinr/service.ts", Appoint)
    return this.http
      .post<Appoint>(`${this.url}/appoint/addAppointment`, Appoint)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Appoint>('appoint'))
      );
  }
  getSpecialtyInfo(){
    return this.http
      .get(`${this.url}/specialty/all`, this.httpOptions) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('getPractiseInfo')
        )
      );
  }
  getDoctorInfo(){
    return this.http
      .get(`${this.url}/doctors/all`, this.httpOptions) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('InsuranceInfo')
        )
      );
  }
}
