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
      .post<Case>(`${this.url}/cases/add`, info)
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
    .get(`${this.url}/category/all`) // Change the return type here too
    .pipe(
      catchError(
        this.errorHandlerService.handleError('getPractiseInfo')
      )
    );
  }
  getCaseTypeInfo(){
    return this.http
    .get(`${this.url}/caseType/all`) // Change the return type here too
    .pipe(
      catchError(
        this.errorHandlerService.handleError('getPractiseInfo')
      )
    );
  }
  getPractiseInfo(){
    return this.http
      .get(`${this.url}/practicelocation/all`) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('getPractiseInfo')
        )
      );
  }
  getVisitInfo(){
    return this.http.get(`${this.url}/cases/visit`).pipe(
      catchError(
        this.errorHandlerService.handleError('getVisitInfo')
      )
    )
  }
  updateCase(id:Number,cases: Case){
    this.http.put(`${this.url}/cases/update/${id}`, cases).subscribe(
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
      .get(`${this.url}/insurance/all`) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError('InsuranceInfo')
        )
      );
  }
  getFirmInfo(){
    return this.http
      .get(`${this.url}/firm/all`) // Change the return type here too
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
    return this.http.get(`${this.url}/cases/allCases`)
    .pipe(
      catchError(
        this.errorHandlerService.handleError('FirmInfo')
      )
    );
  }
  deleteCases(id: Number){
    return this.http.delete(`${this.url}/cases/deleteCase/${id}`).subscribe(
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
