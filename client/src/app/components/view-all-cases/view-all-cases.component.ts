import { Component } from '@angular/core';
import { AppointService } from 'src/app/services/appoint.service';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-view-all-cases',
  templateUrl: './view-all-cases.component.html',
  styleUrls: ['./view-all-cases.component.css']
})
export class ViewAllCasesComponent {
  constructor(private caseService:CaseService, private appointService:AppointService ){}

  ngOnInit(){
    this.getInfo()
  }
  getInfo(){
    // this.caseService.getAllAppointments()
  }
}
