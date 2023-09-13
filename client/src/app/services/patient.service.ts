import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Patient } from '../models/patient';

import { throwError,Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { FilterCriteria } from '../models/filter-criteria';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
    private url = 'http://localhost:3000';
    id:any;
    setId:any;
    dataIncoming:any;
    name:any;
    fetchedData:any;
    constructor(
        private snackBar: MatSnackBar,
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService,
        private router: Router
      ) {}
      httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };
    
    patient(patient: Omit<Patient, 'id'>): Observable<Patient> {
    return this.http
      .post<Patient>(`${this.url}/patient/`, patient)
      .pipe(  
        catchError((error: HttpErrorResponse)=>{
          if(error.status === 401){
            this.snackBar.open("Patient with same Date of Birth already exists","Close", {
              duration: 4000, // Display duration in milliseconds
            });
            this.router.navigate(['/home']);
            return throwError("Bad Request: " + error.error);
          }
          return throwError("An error occured:"+error.message)
        })
      );
  }
  
  getPatient(id: string): Observable<Patient[]> {
    console.log("IN getPatient");
    const numericPatientId = parseInt(id, 10);
    return this.http
      .get<Patient[]>(`${this.url}/patient/${numericPatientId}`)
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Patient[]>('getPatient')
        )
      );
  }
  getPatientsAll(){
    return this.http.get(`${this.url}/patient/`)
  }
  setPatientId(id_R){
    this.setId  = id_R;
    console.log("set Id", this.setId)
  }
  getPatientId(){
    console.log("get", this.setId);
    return this.setId;
  }
  deleteOnePatient(id1:any){
    this.http.delete(`${this.url}/patient/${id1}`).subscribe(
      (response: any)=>{
        console.log("Patient deleted successfully:", response)
        if(response.status === 201){
          this.snackBar.open("The Case is deleted!","Close", {
            duration: 3000, // Display duration in milliseconds
          });
        }
      },
      (error) => {
        if(error.status === 401){
          this.snackBar.open("To delete this Pateint, first delete its Cases.", "Close", {
            duration: 5000, // Display duration in milliseconds
            panelClass: ['error-snackbar'], // Optional custom CSS class for styling
          });
        }
        console.error('Error deleting patient:', error);
      }
    )
  }
  deletePatient(id1:Number,id2:Number,id3:Number){
    console.log("IN AUTH SERVICE",id1,id2,id3)
    return this.http.delete(`${this.url}/patient/${id1}/${id2}/${id3}`).subscribe(
      (response: any) => {
        console.log('Case and Appointment deleted successfully:', response);
        if(response.status === 201){
          this.snackBar.open("The Case is deleted!","Close", {
            duration: 3000, // Display duration in milliseconds
          });
        }
      },
      (error) => {
        console.error('Error deleting cases:', error);
        if(error.status === 400){
          this.snackBar.open("To delete this case, first delete its appointments.", "Close", {
            duration: 5000, // Display duration in milliseconds
            panelClass: ['error-snackbar'], // Optional custom CSS class for styling
          });
        }
      }
    );
  }
   searchPatientsAndCases(filterCriteria: FilterCriteria, page: number, pageSize: number) {
    const body = {
    first_name: filterCriteria.firstName,
    middle_name: filterCriteria.middleName,
    last_name: filterCriteria.lastName,
    caseId: filterCriteria.caseId ? filterCriteria.caseId.toString() : '',
    categoryName: filterCriteria.categoryName,
    purposeOfVisit: filterCriteria.purposeOfVisit,
    caseType: filterCriteria.caseType,
    dob: filterCriteria.dob instanceof Date ? filterCriteria.dob.toISOString(): '',
    practiceLocation: filterCriteria.practiceLocation,
    insuranceName: filterCriteria.insuranceName,
    firmName: filterCriteria.firmName,
    doa: filterCriteria.doa ? filterCriteria.doa.toISOString():'',
    doctor: filterCriteria.doctor,
    page:page,
    pageSize:pageSize
    }
    // new HttpParams() 
    //   .set('first_name', filterCriteria.firstName)
    //   .set('middle_name', filterCriteria.middleName)
    //   .set('last_name', filterCriteria.lastName)
    //   .set('caseId', filterCriteria.caseId ? filterCriteria.caseId.toString() : '')
    //   .set('categoryName', filterCriteria.categoryName)
    //   .set('purposeOfVisit', filterCriteria.purposeOfVisit)
    //   .set('caseType', filterCriteria.caseType)
    //   .set('dob', filterCriteria.dob instanceof Date ? filterCriteria.dob.toISOString(): '')
    //   .set('practiceLocation', filterCriteria.practiceLocation)
    //   .set('insuranceName', filterCriteria.insuranceName)
    //   .set('firmName', filterCriteria.firmName)
    //   .set('doa', filterCriteria.doa ? filterCriteria.doa.toISOString():'')
    //   .set('doctor', filterCriteria.doctor)
    //   .set('page',page)
    //   .set('pageSize',pageSize)
      
    console.log("body:" , body)
   return this.http.post(`${this.url}/patient/filter`,  body )
    
  }
  updateAllData(data:any){
    console.log("Incoming data:", data)
    return this.http.put(`${this.url}/patient/`, data);
  }
}