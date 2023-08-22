import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
  //searchResults : any[] = [];

  patients: Patient[] = [];

  constructor(private patientService: PatientService,private router: Router) {}
  ngOnInit(): void {
    this.search(); 
  }
  addPatient(){
    this.router.navigate(['/patient']);
  }
  viewAllPatient(){
    this.router.navigate(['/allPatient'])
  }
  viewAllCases(){
    this.router.navigate(['/allCases'])
  }
  editPatient(id1,id2) {
   this.router.navigate([`/update-Patient`, id1,id2]);
   }

  deletePatient(id1,id2) {
    console.log("Front end !")
    this.patientService.deletePatient(id1,id2)
    this.ngOnInit();
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
  }
}