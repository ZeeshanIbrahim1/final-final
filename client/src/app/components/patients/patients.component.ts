import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { MatSnackBar } from '@angular/material/snack-bar';
// const { format } = require('date-fns');

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  patientForm: FormGroup;
  maxDate: Date;
  constructor(private patientService: PatientService,private router: Router, private snackBar:MatSnackBar) {}
  ngOnInit(): void {
    this.patientForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    this.maxDate = new Date();
    const formGroupConfig = {
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date_of_birth: new FormControl('', [Validators.required]),
      ssn: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      middle_name: new FormControl(''),
    };

    return new FormGroup(formGroupConfig);
  }
  addPatient() {
    // const selectedDate: Date = this.patientForm.get('date_of_birth').value;
    // const formattedDate = selectedDate.toISOString();

    // const formData = {
    //   ...this.patientForm.value,
    //   date_of_birth: formattedDate, 
    // };
    console.log(this.patientForm.value);
    this.patientService.patient(this.patientForm.value).subscribe( (msg) => {
      console.log("Adding pateint id:",msg);
      this.patientService.setPatientId(msg);
      this.patientForm.reset();
      this.clearErrorStates();
      setTimeout(()=>{
        this.router.navigate(['/case']);
      },250)
      this.snackBar.open("Patient added!","Close", {
        duration: 4000, // Display duration in milliseconds
      });
    });
    (error) => {
      console.error("Error:", error);
  
      // Handle the error and navigate to the home page
      this.router.navigate(['/home']);
    }
  }
  clearErrorStates() {
    const formControls = this.patientForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
}
