import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CaseService } from 'src/app/services/case.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppointService } from 'src/app/services/appoint.service';

@Component({
  selector: 'app-update-case',
  templateUrl: './update-case.component.html',
  styleUrls: ['./update-case.component.css']
})
export class UpdateCaseComponent {
  updateCaseForm: FormGroup;
  caseId: string;
  caseData: any;
  appointmentId: any;
  practiceInfo: any[] = [];
  insuranceInfo: any[] = [];
  firmInfo: any[] = [];
  categoryInfo: any[] = [];
  caseTypeInfo: any[] = [];

  constructor(private appointService:AppointService,  private caseService: CaseService,private route: ActivatedRoute, private http: HttpClient,private router: Router) {}
  async ngOnInit() {
    this.getinfo();
    this.updateCaseForm = this.createCaseGroup();
    this.caseId = this.route.snapshot.paramMap.get('id'); // Assuming you're passing patient ID as a route parameter
    this.appointmentId = this.getAppointId(this.caseId);
    await this.fetchUpdateCase(this.caseId);
  }
  createCaseGroup(): FormGroup {
    const formGroupConfig = {
      practiceLocationId: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      purposeOfVisit: new FormControl('', [Validators.required]),
      caseTypeId: new FormControl('', [Validators.required]),
      doa: new FormControl('', [Validators.required]),
      insuranceId: new FormControl('', [Validators.required]),
      firmId: new FormControl('', [Validators.required]),
    }
    return new FormGroup(formGroupConfig);
  }
  fetchUpdateCase(patientId){
    this.caseService.getCase(patientId)
    .subscribe(
      (cases) => {
        console.log("is it working:", cases)
        this.caseData = cases;
        this.populating();
        return cases;
      },
      (error) => {
        console.error('Error fetching patient:', error);
      }
    );
}
  getinfo() {
    this.PracticeInfo();
    this.InsuranceInfo();
    this.FirmInfo();
    this.CategoryInfo();
    this.CaseTypeInfo();
  }
  populating(){
      this.updateCaseForm.patchValue({
      practiceLocationId: this.caseData.practiceLocationId,
      categoryId: this.caseData.categoryId,
      purposeOfVisit: this.caseData.purposeOfVisit,
      caseTypeId: this.caseData.caseTypeId,
      doa: this.caseData.doa,

      // Attributes for the Insurance section
      insuranceId: this.caseData.insuranceId,
      firmId: this.caseData.firmId,
      })
  }
  clearErrorStates() {
    const formControls = this.updateCaseForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
  PracticeInfo() {
    this.caseService.getPractiseInfo().subscribe((response: any[]) => {
      this.practiceInfo = response;
    });
  }
  InsuranceInfo() {
    this.caseService.getInsuranceInfo().subscribe((response: any[]) => {
      this.insuranceInfo = response;
    });
  }
  FirmInfo() {
    this.caseService.getFirmInfo().subscribe((response: any[]) => {
      this.firmInfo = response;
    });
  }
  CategoryInfo() {
    this.caseService.getCategoryInfo().subscribe((response: any[]) => {
      console.log(response)
      this.categoryInfo = response;
    });
  }
  CaseTypeInfo(){
    this.caseService.getCaseTypeInfo().subscribe((response: any[]) => {
      console.log(response)
      this.caseTypeInfo = response;
    });
  }
  getAppointId(appointId){
    this.appointService.getAppointId(appointId).subscribe((msg: any)=> {
      console.log("Appointment Id:",msg);
      this.appointmentId = msg;
    })
  }
  updateCase() {
    const numericId = parseInt(this.caseId, 10);
    console.log("CaseId:", numericId)
    this.caseService.updateCase(numericId,this.updateCaseForm.value);
    console.log("Updated Case:",this.updateCaseForm.value)
    this.router.navigate(['/update-appointment',this.appointmentId.id])
  }

}
