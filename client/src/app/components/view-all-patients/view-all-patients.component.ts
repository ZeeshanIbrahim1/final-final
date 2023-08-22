import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-view-all-patients',
  templateUrl: './view-all-patients.component.html',
  styleUrls: ['./view-all-patients.component.css']
})
export class ViewAllPatientsComponent {
  patientInfo:any;

  constructor(private router:Router ,private patientService:PatientService){}
  ngOnInit(){
    this.getInfo();
  }
  async getInfo(){
    this.patientService.getPatientsAll().subscribe((response: any[])=>{
      this.patientInfo = response;
      console.log("Patient Info:",this.patientInfo)
    })
  }
  addCases(PatientId){
    this.patientService.setPatientId(PatientId);
    this.router.navigate(['/case']);
  }

}
