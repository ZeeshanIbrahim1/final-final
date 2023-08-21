import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    id:any;
    setId:any;
    mssgss:any;
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
      .post<Patient>(`${this.url}/patients/add`, patient)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Patient>('patient'))
      );
  }
  getAllPatients(): Observable<Patient[]> {
    console.log('working');
    return this.http
      .get<Patient[]>(`${this.url}/patients/all`) 
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
      .get<Patient[]>(`${this.url}/patients/update-Patient/${numericPatientId}`)
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Patient[]>('getPatient')
        )
      );
  }
  updatePatient(id:Number,patient: Omit<Patient, 'id'>){
    this.http.put(`${this.url}/patients/update/${id}`, patient).subscribe(
      (response: any) => {
        console.log('Patient updated successfully:', response);
      },
      (error) => {
        console.error('Error updating patient:', error);
      }
    );
  }
  setPatientId(id_R){
    this.setId  = id_R;
    console.log("set Id", this.setId)
  }
  getPatientId(){
    console.log("get", this.setId);
    return this.setId;
  }
  deletePatient(id:Number){
    console.log("IN AUTH SERVICE",id)
    return this.http.delete(`${this.url}/patients/delete/${id}`).subscribe(
      (response: any) => {
        console.log('Patient deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting patient:', error);
      }
    );
  }
  async searchPatientsAndCases(
    firstName: string | null,
    middleName: string| null,
    lastName:string| null,
    caseId: number | null,
    categoryName : string | null,
    purposeOfVisit : string | null,
    caseType : string | null,
    dob : Date | null,
    practiceLocation : string | null,
    insuranceName : string | null,
    firmName : string | null,
    doa : Date | null,
    doctor : string | null,
  ) {
    console.log("dob", dob, typeof(dob))
    const params = new HttpParams() 
      .set('first_name', firstName)
      .set('middle_name', middleName)
      .set('last_name', lastName)
      .set('caseId', caseId ? caseId.toString() : '')
      .set('categoryName', categoryName)
      .set('purposeOfVisit',purposeOfVisit)
      .set('caseType',caseType)
      .set('dob', dob instanceof Date ? dob.toISOString(): '')
      .set('practiceLocation',practiceLocation)
      .set('insuranceName',insuranceName)
      .set('firmName',firmName)
      .set('doa',doa ? doa.toISOString():'')
      .set('doctor',doctor)

    return this.http.get(`${this.url}/patients/filter`, { params }).toPromise()
    
  }
}