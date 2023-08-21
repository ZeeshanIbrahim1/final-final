import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CaseService } from 'src/app/services/case.service';
import { AppointService } from 'src/app/services/appoint.service';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.css']
})
export class UpdateAppointmentComponent {
  appointmentId: any;
  appointmentData: any;
  caseId:any;
  specialtyInfo: any[] = [];
  doctorInfo: any[] = [];
  typeInfo: any[] = []; 
  updateAppointmentForm: FormGroup;

  constructor(private appointService:AppointService , private caseService:CaseService,private router: Router,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getInfo();
    this.updateAppointmentForm = this.createFormGroup();
    this.appointmentId = this.route.snapshot.paramMap.get('id');
    console.log("id",this.appointmentId);
    this.caseId = this.caseService.getCaseId();
    console.log("IN UPDATE APPOINTMENT COMPONENT:",this.caseId);
    this.fetchUpdateAppoint(this.appointmentId)
  }
  createFormGroup(): FormGroup {
    const formGroupConfig = {
      caseId :  new FormControl('', [Validators.required]),
      appointmentDate: new FormControl('', [Validators.required]),
      appointmentTime: new FormControl('', [Validators.required]),
      appointmentTypeId: new FormControl('', [Validators.required]),
      specialtyId: new FormControl('', [Validators.required]),
      doctorId: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
    };
    return new FormGroup(formGroupConfig);
  }
  fetchUpdateAppoint(appointmentId){
    this.appointService.getAppointments(appointmentId)
    .subscribe((appointments)=>{
      console.log("Appointment working:", appointments)
      this.appointmentData = appointments;
      console.log("Appointment from backend:", this.appointmentData)
      this.populating();
      return appointments;
    },
    (error)=>{
      console.log('Error fetching Appointmentss:', error)
    })
  }
  updateAppoint(){
    this.appointService.updateAppointment(this.appointmentId,this.updateAppointmentForm.value)
    console.log("Updated Appointment:",this.updateAppointmentForm.value )
    setTimeout(()=>{
    this.router.navigate(['/home'])
  },500)
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
  getInfo(){
    this.getSpecialityInfo();
    this.getDoctorInfo();
    this.getTypeInfo();
    console.log("Appointment DATA:", )
  }
  populating(){
    this.updateAppointmentForm.patchValue({
      caseId :  this.appointmentData.caseId,
      appointmentDate: this.appointmentData.appointmentDate,
      appointmentTime: this.appointmentData.appointmentTime,
      appointmentTypeId: this.appointmentData.appointmentTypeId,
      specialtyId: this.appointmentData.specialtyId,
      doctorId: this.appointmentData.doctorId,
      duration: this.appointmentData.duration,
    })
  }
  getSpecialityInfo(){
    this.appointService.getSpecialtyInfo().subscribe((response: any[]) => {
      console.log(response)
      this.specialtyInfo = response;
    });
  }
  getTypeInfo(){
    this.appointService.getTypeInfo().subscribe((response: any[])=>{
      console.log(response);
      this.typeInfo = response;
    })
  }
  getDoctorInfo() {
    this.appointService.getDoctorInfo().subscribe((response: any[]) => {
      console.log(response)
      this.doctorInfo = response;
    });
  }
}
