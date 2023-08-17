import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent {
  appointmentId: number | null = null;
  caseId:any;
  specialtyInfo: any[] = [];
  doctorInfo: any[] = [];

  updateAppointmentForm: FormGroup;
  constructor(private caseService:CaseService,private router: Router,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.appointmentId = +params.get('id');
      console.log("id",this.appointmentId);
      this.caseId = this.caseService.getCaseId(this.appointmentId);
      console.log("IN UPDATE APPOINTMENT COMPONENT:",this.caseId);
      this.updateAppointmentForm = this.createFormGroup();
    });
  }
  createFormGroup(): FormGroup {
    const formGroupConfig = {
      caseId :  new FormControl(this.caseId, [Validators.required]),
      appointmentDate: new FormControl('', [Validators.required]),
      appointmentTime: new FormControl('', [Validators.required]),
      appointmentType: new FormControl('', [Validators.required]),
      specialtyId: new FormControl('', [Validators.required]),
      doctorId: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
    };
    return new FormGroup(formGroupConfig);
  }
  updateAppoint(){
    
  }
  onButtonClick(){
    this.router.navigate(['/home']);
  }
  noAppointmentAssigned(): boolean{
    if(this.appointmentId === 0){
      return true;
    }
    else{
      return false;
    }
  }

}
