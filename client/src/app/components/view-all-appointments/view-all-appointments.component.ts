import { Component } from '@angular/core';
import { AppointService } from 'src/app/services/appoint.service';

@Component({
  selector: 'app-view-all-appointments',
  templateUrl: './view-all-appointments.component.html',
  styleUrls: ['./view-all-appointments.component.css']
})
export class ViewAllAppointmentsComponent {
  appointmentInfo: any;
  constructor(private appointService:AppointService){}
  ngOnInit(){
    this.getAppointmentInfo();
  }
  getAppointmentInfo(){
    this.appointService.getAllAppointments()
    .subscribe(
    (response)=>{
      this.appointmentInfo = response;
      console.log(`data Incoming `, response)
      }
    )
  }
  deleteAppointment(id:any){
    this.appointService.deleteAppointment(id)
    .subscribe(
      ()=>this.ngOnInit()
    )
  }
}
