import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointService } from 'src/app/services/appoint.service';
import { CaseService } from 'src/app/services/case.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-view-all-cases',
  templateUrl: './view-all-cases.component.html',
  styleUrls: ['./view-all-cases.component.css']
})
export class ViewAllCasesComponent {
  casesInfo:any;
  constructor(private router:Router,private patientService:PatientService, private caseService:CaseService, private appointService:AppointService ){}

  ngOnInit(){
    this.getInfo()
  }
  getInfo(){
    this.caseService.getAllCases()
    .subscribe((data)=>{
      console.log("Cases-data",data)
      this.casesInfo = data;
      console.log("Cases data", this.casesInfo)
    })
  }
  addAppointments(id:any){
    this.patientService.setPatientId(id);
    setTimeout(() => {
      this.router.navigate(['/appointment']);
    }, 100);
  }
  deleteCases(id:any){
    this.caseService.deleteCases(id).subscribe((data)=>{
      this.ngOnInit();
    },(error)=> console.log(error))
  }
}
