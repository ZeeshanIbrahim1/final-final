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
  getAppointId(appointId:any){
    return this.http.get(`${this.url}/appoint/getId/${appointId}`) 
  }
  getAppointments(appointmentId:any){
    return this.http.get(`${this.url}/appoint/getAppoints/${appointmentId}`)
    .pipe(
      catchError(
        this.errorHandlerService.handleError('getAppointments')
      )
    );
  }
  getSpecialtyInfo(){
    return this.http
      .get(`${this.url}/specialty/all`) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('getPractiseInfo')
        )
      );
  }
  getDoctorInfo(){
    return this.http
      .get(`${this.url}/doctors/all`) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('InsuranceInfo')
        )
      );
  }
  getTypeInfo(){
    return this.http.get(`${this.url}/appoint/getType`)
    .pipe(
      catchError(
        this.errorHandlerService.handleError('typeInfo')
      )
    )
  }
  updateAppointment(appointmentId: number,value){
      this.http.put(`${this.url}/appoint/updateAppoint/${appointmentId}`,value).subscribe(
      (response: any) => {
        console.log('Appointment updated successfully:', response);
      },
      (error) => {
        console.error('Error updating Appointment:', error);
      })
  }
}
