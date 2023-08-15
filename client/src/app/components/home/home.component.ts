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
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  addPatient(){
    this.router.navigate(['/patient']);
  }
  editPatient(patient: Patient) {
   this.router.navigate([`/update-Patient`, patient.id]);
   }

  deletePatient(patient: Patient): void {
    console.log("Front end !")
      this.patientService.deletePatient(patient.id)
      this.fetchPatients()
    }
}
