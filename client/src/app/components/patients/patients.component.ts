import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  patientForm: FormGroup;
  constructor(private patientService: PatientService,private router: Router) {}
  ngOnInit(): void {
    this.patientForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
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
    console.log(this.patientForm.value);
    this.patientService.patient(this.patientForm.value).subscribe( (msg) => {
      console.log("Adding pateint id:",msg);
      this.patientService.setPatientId(msg);
    });
    
    //to-do patient jo add kia hua he uskay response se id pakkar or navigate me case me bhej de
    this.patientForm.reset();
    this.clearErrorStates();

    setTimeout(()=>{
      this.router.navigate(['/case']);

    },2000)
  }
  clearErrorStates() {
    const formControls = this.patientForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
}
