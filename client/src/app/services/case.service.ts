import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Case } from '../models/case';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { UpdatePatientComponent } from '../components/update-patient/update-patient.component';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  private url = 'http://localhost:3000';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}
  
  case(info: Omit<Case, 'id'>): Observable<Case> {
    return this.http
      .post<Case>(`${this.url}/cases/add`, info, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Case>('case'))
      );
  }
  getCase(patientId){
    return this.http
      .get(`${this.url}/cases/getCase/${patientId}`, this.httpOptions) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('getPractiseInfo')
        )
      );
  }
  getPractiseInfo(){
    return this.http
      .get(`${this.url}/practicelocation/all`, this.httpOptions) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('getPractiseInfo')
        )
      );
  }
  updateCase(id:Number,cases: Case){
    this.http.put(`${this.url}/cases/update/${id}`, cases, this.httpOptions).subscribe(
      (response: any) => {
        console.log('Patient updated successfully:', response);
      },
      (error) => {
        console.error('Error updating patient:', error);
      }
    );
  }
  getInsuranceInfo(){
    return this.http
      .get(`${this.url}/insurance/all`, this.httpOptions) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('InsuranceInfo')
        )
      );
  }
  getFirmInfo(){
    return this.http
      .get(`${this.url}/firm/all`, this.httpOptions) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('FirmInfo')
        )
      );
  }
}
