import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Router } from '@angular/router';
import {MatPaginatorIntl, PageEvent} from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { FilterCriteria } from 'src/app/models/filter-criteria';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements MatPaginatorIntl {
  totalItems: number = 100;
  pageSizeOptions: number[] = [5,10, 50, 100];
  retrievedData: any;
  filterForm: FormGroup;
  displayedColumns: string[] = []
  //searchResults : any[] = [];
  filterCriteria: FilterCriteria = new FilterCriteria();
  patients: Patient[] = [];
  page : any = 0;
  pageSize : any = 5;
  searchCtrl = new FormControl();

  
  constructor(private fb: FormBuilder,private patientService: PatientService,private router: Router) {
    this.filterForm = this.fb.group(new FilterCriteria());
    this.filterCriteria = this.filterForm.value;
  }
  @ViewChild('multiUserSearch') multiUserSearchInput: ElementRef;
  changes: Subject<void>;
  itemsPerPageLabel = 'Items per page:';
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';
  firstPageLabel = 'First page';
  lastPageLabel = 'Last page';
  uniquePatientFN: string[] = [];
  _uniquePatientFN: string[] = [];
  uniquePatientMN: string[] = [];
  _uniquePatientMN: string[] = [];
  uniquePatientLN: string[] = [];
  _uniquePatientLN: string[] = [];
  uniqueCategoryName: string[] = [];
  _uniqueCategoryName: string[] = [];
  uniquePoV: string[] = [];
  _uniquePoV: string[] = [];
  uniqueCaseType: string[] = [];
  _uniqueCaseType: string[] = [];
  uniquePracticeLocation: string[] = [];
  _uniquePracticeLocation: string[] = [];
  uniqueInsuranceName: string[] = [];
  _uniqueInsuranceName: string[] = [];
  uniqueFirmNames: string[] = [];
  _uniqueFirmNames: string[] = [];
  uniqueDoctor: string[] = [];
  _uniqueDoctor: string[] = []

  uniquePatientFNSet = new Set<string>();
  uniquePatientMNSet = new Set<string>();
  uniquePatientLNSet = new Set<string>();
  uniqueCategoryNameSet = new Set<string>();
  uniquePoVSet = new Set<string>();
  uniqueCaseTypeSet = new Set<string>();
  uniquePracticeLocationSet = new Set<string>();
  uniqueInsuranceNameSet = new Set<string>();
  uniqueDoctorSet = new Set<string>();
  uniqueFirmNamesSet = new Set<string>();




populating(){
  this.retrievedData.forEach((data) => {
    this.uniquePatientFNSet.add(data.PatientFirstName);
    this.uniquePatientMNSet.add(data.PatientMiddleName);
    this.uniquePatientLNSet.add(data.PatientLastName);
    this.uniqueCategoryNameSet.add(data.categoryName);
    this.uniquePoVSet.add(data.purposeOfVisit );
    this.uniqueCaseTypeSet.add(data.caseType);
    this.uniquePracticeLocationSet.add(data.practiceLocation);
    this.uniqueInsuranceNameSet.add(data.insuranceName);
    this.uniqueDoctorSet.add(data.doctorFirstName);
    this.uniqueFirmNamesSet.add(data.firmName);
  });
  
  // Convert the Set back to an array for template use
  this.uniquePatientFN = Array.from(this.uniquePatientFNSet);
  this.uniquePatientMN = Array.from(this.uniquePatientMNSet);
  this.uniquePatientLN = Array.from(this.uniquePatientLNSet);
  this.uniqueCategoryName = Array.from(this.uniqueCategoryNameSet);
  this.uniquePoV = Array.from(this.uniquePoVSet);
  this.uniqueCaseType = Array.from(this.uniqueCaseTypeSet);
  this.uniquePracticeLocation = Array.from(this.uniquePracticeLocationSet);
  this.uniqueInsuranceName = Array.from(this.uniqueInsuranceNameSet);
  this.uniqueFirmNames = Array.from(this.uniqueFirmNamesSet);
  this.uniqueDoctor = Array.from(this.uniqueDoctorSet);
  
  
  this._uniquePatientFN = this.uniquePatientFN
  this._uniquePatientMN = this.uniquePatientMN;
  this._uniquePatientLN = this.uniquePatientLN;
  this._uniqueCategoryName = this.uniqueCategoryName;
  this._uniquePoV = this.uniquePoV;
  this._uniquePracticeLocation = this.uniquePracticeLocation;
  this._uniqueCaseType = this.uniqueCaseType; 
  this._uniqueInsuranceName = this.uniqueInsuranceName;
  this._uniqueFirmNames = this.uniqueFirmNames;
  this._uniqueDoctor = this.uniqueDoctor;
}


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
    console.log("SECOND INCOMING")
    console.log("doctors:",  this.filterForm.value.doctor)
    
     this.patientService.searchPatientsAndCases(
      this.filterForm.value,
       this.page,
       this.pageSize
     ).subscribe((info)=> {
      console.log("info",info)
      this.retrievedData = info;
      console.log("Again trying", this.retrievedData)
      this.displayInfo();
      this.populating();
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
  onInputChange(name:string,originalName:string){
    console.log(this.multiUserSearchInput.nativeElement.value)
    const searchInput = this.multiUserSearchInput.nativeElement.value ? this.multiUserSearchInput.nativeElement.value.toLowerCase() : '';
    this[name] = this[originalName].filter((data) =>{
        if(data){
          const name:string = data.toLowerCase();
          return name.indexOf(searchInput) > -1; 
        }
        return 0;
      }
      )
    }
    onFilterChange(filterName: string, newValue: string | any) {
      this.filterForm.value[filterName] = newValue.value;
      console.log(`Filter changed for ${filterName}:`, newValue.value);
    }
  
}