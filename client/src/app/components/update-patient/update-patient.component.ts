import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Patient } from 'src/app/models/patient';
@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent {
  updatePatientForm: FormGroup;
  patientId: string;
  patientData: any; // To store patient's data

  constructor(private patientService: PatientService,private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit() {
    this.updatePatientForm = this.createFormGroup();
    this.patientId = this.route.snapshot.paramMap.get('id'); // Assuming you're passing patient ID as a route parameter
    await this.fetchUpdatePatient(this.patientId);
  }
  
  createFormGroup(): FormGroup {
    const formGroupConfig = {
      first_name: new FormControl(`$patients[first.name]`, [
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
    this.patientService.updatePatient(numericId,this.updatePatientForm.value);
  }
  populating(){
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
