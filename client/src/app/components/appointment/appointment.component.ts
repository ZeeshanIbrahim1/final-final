import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppointService } from 'src/app/services/appoint.service';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent {
  caseId:any;
  patientId:any;
  appointmentForm: FormGroup;
  constructor(private appointService: AppointService,private patientService:PatientService, private router:Router) {}
  ngOnInit(): void {
    this.caseId = this.patientService.getPatientId();
    console.log(this.caseId);
    this.appointmentForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    const formGroupConfig = {
      caseId :  new FormControl(this.caseId, [Validators.required]),
      appointmentDate: new FormControl('', [Validators.required]),
      appointmentTime: new FormControl('', [Validators.required]),
      appointmentType: new FormControl('', [Validators.required]),
      specialty: new FormControl('', [Validators.required]),
      doctor: new FormControl('', [Validators.required]),

      // Attributes for the Insurance section
      practiceLocation: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
    };
    return new FormGroup(formGroupConfig);
  }
  addAppoint() {
    const selectedDate: Date = this.appointmentForm.get('appointmentDate').value;
    const formattedDate = selectedDate.toISOString();

    const formData = {
      ...this.appointmentForm.value,
      appointmentDate: formattedDate, 
    };
    console.log(formData.value);
    this.appointService
    .appoint(formData.value)
    .subscribe((msg) => console.log(msg));
    // this.appointmentForm.reset();
    this.clearErrorStates();
    // this.router.navigate(['/home'])
  }
  onButtonClick(){
    this.router.navigate(['/home']);
  }
  clearErrorStates() {
    const formControls = this.appointmentForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
}
