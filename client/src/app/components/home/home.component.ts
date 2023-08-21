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
  searchResults : any[] = [];

  patients: Patient[] = [];
  flattenedData:any[] = [];
  constructor(private patientService: PatientService,private router: Router) {}
  ngOnInit(): void {
    this.fetchPatients();
  }
  fetchPatients(): void {
    this.patientService.getAllPatients()
    .subscribe(
      (data) => {
        console.log('Showing Patients', data);
        this.patients = data; // Assign fetched data to the patients array
        this.storingFlattenData(this.patients);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  addPatient(){
    this.router.navigate(['/patient']);
  }
  editPatient(id1,id2) {
   this.router.navigate([`/update-Patient`, id1,id2]);
   }
   storingFlattenData(patients){
    try {
      console.log("Patient variable:",patients)
      patients.forEach((patient) => {
        if (patient.Cases && patient.Cases.length > 0) {
          patient.Cases.forEach((caseItem) => {      
            this.flattenedData.push({
              patientId: patient.id,
              patientName: `${patient.first_name} ${patient.middle_name} ${patient.last_name}`,
              caseId: caseItem.id,
              // categoryName: caseItem.Category.categoryName,
              purposeOfVisit: caseItem.purposeOfVisit,
              caseType: caseItem.caseType,
              doB: patient.doB,
              // practiceLocation: caseItem.PracticeLocation.name,
              insuranceName: caseItem.Insurance.insuranceName,
              firmName: caseItem.Firm.firmName,
              doa: caseItem.doa,
              speciality:'',
              appointmentDateTime: '',
              doctorname: ''
            });
          });
        } else {
          this.flattenedData.push({
          patientId: patient.id,
          patientName: `${patient.first_name} ${patient.middle_name} ${patient.last_name}`,
        })
        }
      });
      
    } catch (error) {
      console.log("Error in flatten:",error);
    }
    
    console.log("Flatten Data:",this.flattenedData);
   }

  async deletePatient(id) {
    console.log("Front end !")
    await this.patientService.deletePatient(id)
    this.ngOnInit();
  }
  search(){
    this.patientService
    .searchPatientsAndCases(
      this.firmName,
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
    )
    // .subscribe((results) => {
    //   this.searchResults = results;
    // });
  }
}