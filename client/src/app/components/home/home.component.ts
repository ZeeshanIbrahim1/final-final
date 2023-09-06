import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Router } from '@angular/router';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements MatPaginatorIntl {
  totalItems: number = 200;
  pageSizeOptions: number[] = [5,10, 50, 100];
  retrievedData: any;
  firstName: string = '';
  middleName: string ='';
  lastName: string= '';
  caseId: number | null = null;
  categoryName: string = '';
  purposeOfVisit: string = '';
  caseType: string = '';
  dob: Date | null =null;
  practiceLocation : string = '';
  insuranceName : string = '';
  firmName : string = '';
  doa : Date | null =null;
  doctor: string = '';
  displayedColumns: string[] = []
  //searchResults : any[] = [];

  patients: Patient[] = [];
  page : any = 1;
  pageSize : any = 5;

  constructor(private patientService: PatientService,private router: Router) {}
  changes: Subject<void>;
  itemsPerPageLabel = 'Items per page:';
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';
  firstPageLabel = 'First page';
  lastPageLabel = 'Last page';

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex } - ${endIndex} of ${length}`;
  };
  ngOnInit(): void {
    this.search(); 
    this.displayedColumns = [
      'patientId',
      'patientName',
      'caseId',
      'appointmentId',
      'categoryName',
      'purposeOfVisit',
      'caseType',
      'dob',
      'practiceLocation',
      'insuranceName',
      'firmName',
      'doa',
      'doctor',
      // ... Include other column names here ...
      'edit',
      'delete'
    ];
  }

  editPatient(id1:Number,id2:Number,id3:Number) {
    if(!id3){
      id3 = 0;
    }
   this.router.navigate([`/update`, id1,id2,id3]);
   }

  deletePatient(id1:any,id2:any,id3:any) {
    console.log("Front end !")
    let isExecuted = confirm("Are you sure you want to delete?")
    if(isExecuted){
      if(!id3){
        id3 = 0;
      }
      this.patientService.deletePatient(id1,id2,id3)
      setTimeout(() => { 
        this.search(); 
      }, 200);
    }
  }
  setPage(event: PageEvent){
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log("pagination : " , this.page , this.pageSize )
    this.search();
  }
  search(){
     this.patientService.searchPatientsAndCases(
       this.firstName,
       this.middleName,
       this.lastName,
       this.caseId,
       this.categoryName,
       this.purposeOfVisit,
       this.caseType,
       this.dob,
       this.practiceLocation,
       this.insuranceName,
       this.firmName,
       this.doa,
       this.doctor,
       this.page,
       this.pageSize
     ).subscribe((info)=> {
      console.log("info",info)
      this.retrievedData = info;
      console.log("Again trying", this.retrievedData)
      this.displayInfo();
    })
  }
  displayInfo(){
      // console.log("All information:",this.retrievedData)
      if(this.retrievedData[0] === 'No such data with filter exists'){
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = "NO DATA";
            this.retrievedData.length = 0;
       }
      }
      else{
        const messageElement = document.getElementById('message')
        messageElement.textContent = null;
      }
  }
  
}