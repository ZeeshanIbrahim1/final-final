import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Patient } from '../models/patient';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { UpdatePatientComponent } from '../components/update-patient/update-patient.component';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
    private url = 'http://localhost:3000';
    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
        private router: Router
      ) {}
      httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    
    patient(patient: Omit<Patient, 'id'>): Observable<Patient> {
    return this.http
      .post<Patient>(`${this.url}/patients/add`, patient, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Patient>('patient'))
      );
  }
  getAllPatients(): Observable<Patient[]> {
    console.log('working');
    return this.http
      .get<Patient[]>(`${this.url}/patients/all`, this.httpOptions) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Patient[]>('getAllPatients')
        )
      );
  }
  getPatient(id: string): Observable<Patient[]> {
    console.log("IN getPatient");
    const numericPatientId = parseInt(id, 10);
    return this.http
      .get<Patient[]>(`${this.url}/patients/update-Patient/${numericPatientId}`, this.httpOptions)
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Patient[]>('getPatient')
        )
      );
  }
  updatePatient(id:Number,patient: Omit<Patient, 'id'>){
    this.http.put(`${this.url}/patients/update/${id}`, patient, this.httpOptions).subscribe(
      (response: any) => {
        console.log('Patient updated successfully:', response);
      },
      (error) => {
        console.error('Error updating patient:', error);
      }
    );
  }
  deletePatient(id:Number){
    console.log("IN AUTH SERVICE",id)
    return this.http.delete(`${this.url}/patients/delete/${id}`, this.httpOptions).subscribe(
      (response: any) => {
        console.log('Patient deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting patient:', error);
      }
    );
  }}