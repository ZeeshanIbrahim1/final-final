import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Case } from '../models/case';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { UpdatePatientComponent } from '../components/update-patient/update-patient.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  private url = 'http://localhost:3000';
  currentCaseId: any;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}
  
  case(info: Omit<Case, 'id'>): Observable<Case> {
    return this.http
      .post<Case>(`${this.url}/cases/`, info)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Case>('case'))
      );
  }
  getCase(patientId){
    return this.http
      .get(`${this.url}/cases/getCase/${patientId}`) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('getCase')
        )
      );
  }
  getCategoryInfo(){
    return this.http
    .get(`${this.url}/category/`) // Change the return type here too
    .pipe(
      catchError(
        this.errorHandlerService.handleError('getPractiseInfo')
      )
    );
  }
  getCaseTypeInfo(){
    return this.http
    .get(`${this.url}/caseType/`) // Change the return type here too
    .pipe(
      catchError(
        this.errorHandlerService.handleError('getPractiseInfo')
      )
    );
  }
  getPractiseInfo(){
    return this.http
      .get(`${this.url}/practicelocation/`) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('getPractiseInfo')
        )
      );
  }
  getVisitInfo(){
    return this.http.get(`${this.url}/purposeOfVisit/`).pipe(
      catchError(
        this.errorHandlerService.handleError('getVisitInfo')
      )
    )
  }
  updateCase(id:Number,cases: Case){
    this.http.put(`${this.url}/cases/${id}`, cases).subscribe(
      (response: any) => {
        console.log('Cases updated successfully:', response);
      },
      (error) => {
        console.error('Error updating patient:', error);
      }
    );
  }
  getInsuranceInfo(){
    return this.http
      .get(`${this.url}/insurance/`) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('InsuranceInfo')
        )
      );
  }
  getFirmInfo(){
    return this.http
      .get(`${this.url}/firm/`) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('FirmInfo')
        )
      );
  }
  getCaseId(){
    return this.currentCaseId;
  }
  setCaseId(caseId){
    this.currentCaseId = caseId;
  }
  getAllCases(){
    return this.http.get(`${this.url}/cases/`)
    .pipe(
      catchError(
        this.errorHandlerService.handleError('getAllCases')
      )
    );
  }
  deleteCases(id: Number){
    return this.http.delete(`${this.url}/cases/${id}`).subscribe(
      (response: any) =>{
        console.log('Case and Appointment deleted successfully:', response);
        if(response.status === 201){
          this.snackBar.open("The Case is deleted!","Close", {
            duration: 3000, // Display duration in milliseconds
          });
        }
      },
      (error)=>{
        console.error('Error deleting cases:', error);
        if(error.status === 400){
          this.snackBar.open("To delete this case, first delete its appointments.", "Close", {
            duration: 5000, // Display duration in milliseconds
            panelClass: ['error-snackbar'], // Optional custom CSS class for styling
          });
        }
      })
  }
  
}
