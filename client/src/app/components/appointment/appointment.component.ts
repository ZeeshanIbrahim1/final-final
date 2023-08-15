import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppointService } from 'src/app/services/appoint.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent {
  appointmentForm: FormGroup;
  constructor(private appointService: AppointService, private router:Router) {}
  ngOnInit(): void {
    this.appointmentForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    const formGroupConfig = {
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
    console.log(this.appointmentForm.value);
    this.appointService
    .appoint(this.appointmentForm.value)
    .subscribe((msg) => console.log(msg));
    // this.appointmentForm.reset();
    this.clearErrorStates();
    // this.router.navigate(['/home'])
  }
  clearErrorStates() {
    const formControls = this.appointmentForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
}
