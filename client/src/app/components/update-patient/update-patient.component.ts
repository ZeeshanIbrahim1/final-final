import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/models/patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  maxDate: any;
  updatePatientForm: FormGroup;
  patientId: string;
  caseId: string;
  date = new Date();
  patientData: any; // To store patient's data

  constructor(private patientService: PatientService,private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

  async ngOnInit() {
    this.updatePatientForm = this.createFormGroup();
    this.patientId =  this.route.snapshot.params['id1'];
    this.caseId = this.route.snapshot.params['id2'];
    await this.fetchUpdatePatient(this.patientId);
  
  }
  
  createFormGroup(): FormGroup {
    
    const formGroupConfig = {
      first_name: new FormControl(``, [
        Validators.required,
        Validators.minLength(2),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl(``, [Validators.required, Validators.email]),
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
  
   fetchUpdatePatient(patientId){
        this.patientService.getPatient(patientId)
        .subscribe(
          (patients) => {
            console.log("is it working:", patients)
            this.patientData = patients;
            this.populating();
            return patients;
          },
          (error) => {
            console.error('Error fetching patient:', error);
          }
        );
    }
  updatePatient() {
    const numericId = parseInt(this.patientId, 10);
    this.router.navigate(['./update-case/',this.caseId])
  }
  populating(){
    this.maxDate = new Date();
    console.log("dateee", this.maxDate)
    console.log("dob value", this.patientData.date_of_birth)
    console.log("date", this.date)
    this.updatePatientForm.patchValue({
      first_name: this.patientData.first_name,
      middle_name: this.patientData.middle_name ,
      last_name: this.patientData.last_name,
      email: this.patientData.email,
      ssn: this.patientData.ssn,
      address: this.patientData.address,
      city: this.patientData.city,
      state: this.patientData.state,
      gender: this.patientData.gender,
      zip: this.patientData.zip,
      date_of_birth: this.patientData.date_of_birth,
    });   
  }
}
