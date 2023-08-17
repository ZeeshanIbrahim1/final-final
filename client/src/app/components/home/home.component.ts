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
  editPatient(id1,id2,id3) {
   this.router.navigate([`/update-Patient`, id1,id2,id3]);
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
              category: caseItem.category,
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

  deletePatient(patient: Patient): void {
    console.log("Front end !")
      this.patientService.deletePatient(patient.id)
      this.fetchPatients()
    }
}
